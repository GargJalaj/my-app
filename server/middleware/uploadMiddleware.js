const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the upload directory path relative to the server root
const uploadDir = path.join(__dirname, '..', 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Upload directory created at: ${uploadDir}`);
} else {
     console.log(`Upload directory exists at: ${uploadDir}`);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Files will be saved in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        // Create a unique filename: fieldname-timestamp.extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

// File Filter Function
const fileFilter = (req, file, cb) => {
    // Allowed file extensions and mime types
    const allowedFiletypes = /pdf/;
    const allowedMimetypes = /application\/pdf/;

    // Check extension
    const extname = allowedFiletypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = allowedMimetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true); // Accept the file
    } else {
        // Reject the file with a specific error message
        cb(new Error('Invalid file type. Only PDF files are allowed.'), false);
    }
};

// Multer Configuration Object
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 15 * 1024 * 1024, // 15 MB limit
    },
});

// Middleware wrapper to handle potential Multer errors gracefully
const uploadMiddleware = (fieldName) => (req, res, next) => {
    const multerUpload = upload.single(fieldName); // 'pdfFile' should be the field name

    multerUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Handle Multer-specific errors (e.g., file size limit exceeded)
            console.error('Multer Error:', err);
            let message = 'File upload error.';
            if (err.code === 'LIMIT_FILE_SIZE') {
                message = 'File is too large. Maximum size allowed is 15MB.';
            }
            return res.status(400).json({ success: false, msg: message });
        } else if (err) {
            // Handle errors from the fileFilter (e.g., wrong file type) or other issues
            console.error('Upload Error:', err);
            return res.status(400).json({ success: false, msg: err.message || 'File upload failed.' });
        }
        // If no errors, proceed to the next middleware or controller
        next();
    });
};

module.exports = uploadMiddleware;