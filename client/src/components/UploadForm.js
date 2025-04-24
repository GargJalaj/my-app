import React, { useState } from 'react';
import { flashcardService } from '../services/api';

function UploadForm({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0); // State for progress

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        // Basic validation (optional)
        if (selectedFile && selectedFile.type !== 'application/pdf') {
             setError('Please select a valid PDF file.');
             setFile(null);
             event.target.value = ''; // Clear the input
             return;
        }
        if (selectedFile && selectedFile.size > 15 * 1024 * 1024) { // Check size (matches backend limit)
             setError('File size exceeds 15MB limit.');
             setFile(null);
             event.target.value = '';
             return;
        }
        setFile(selectedFile);
        setError('');
        setSuccessMessage('');
        setUploadProgress(0); // Reset progress
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setError('Please select a PDF file to upload.');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccessMessage('');
        setUploadProgress(0);

        const formData = new FormData();
        // Key 'pdfFile' must match the field name in uploadMiddleware('pdfFile')
        formData.append('pdfFile', file);

        try {
            // Pass the progress callback to the service function
            const response = await flashcardService.uploadPdfAndGenerate(formData, (progress) => {
                setUploadProgress(progress);
            });

             // Check backend success flag
             if (response.success) {
                 setSuccessMessage(response.msg || 'Flashcards generated successfully!');
                 if (onUploadSuccess) {
                     onUploadSuccess(response.data); // Pass the new flashcard set data
                 }
             } else {
                 // Handle backend error message
                 throw new Error(response.msg || 'Upload failed on the server.');
             }

        } catch (err) {
            console.error("Upload failed:", err);
            // Attempt to get error message from response, fallback to generic message
            const errMsg = err.response?.data?.msg || err.message || 'An error occurred during upload.';
            setError(errMsg);
             setUploadProgress(0); // Reset progress on error
        } finally {
            setIsLoading(false);
             // Clear the file input visually after success or error
             const fileInput = document.getElementById('pdf-upload-input');
             if(fileInput) fileInput.value = '';
             setFile(null); // Clear file state
        }
    };

    return (
        <div style={styles.uploadContainer}>
            <h3>Generate New Flashcards</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pdf-upload-input" style={styles.label}>Select PDF:</label>
                <input
                    style={styles.input}
                    id="pdf-upload-input"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    disabled={isLoading}
                />
                {file && <p style={styles.fileName}>Selected: {file.name}</p>}

                {/* Progress Bar */}
                {isLoading && (
                    <div style={styles.progressBarContainer}>
                         <div style={{...styles.progressBar, width: `${uploadProgress}%`}}>
                             {uploadProgress > 10 ? `${uploadProgress}%` : ''}
                         </div>
                    </div>
                )}

                <button type="submit" disabled={isLoading || !file} style={styles.button}>
                    {isLoading ? 'Processing...' : 'Upload & Generate'}
                </button>
            </form>
            {error && <p style={styles.errorMessage}>Error: {error}</p>}
            {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
        </div>
    );
}

// Basic inline styles
const styles = {
    uploadContainer: {
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginBottom: '30px',
        backgroundColor: '#f9f9f9',
    },
     label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        display: 'block',
        width: 'calc(100% - 22px)', // Adjust width considering padding/border
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
     fileName: {
        fontSize: '0.9em',
        fontStyle: 'italic',
        color: '#555',
        marginBottom: '15px',
    },
     button: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.3s ease',
        opacity: 1, // Base opacity
    },
    // Add disabled styles (though browser handles some)
    buttonDisabled: {
        backgroundColor: '#cccccc',
        cursor: 'not-allowed',
    },
    errorMessage: {
        color: 'red',
        marginTop: '10px',
        fontWeight: 'bold',
    },
    successMessage: {
        color: 'green',
        marginTop: '10px',
        fontWeight: 'bold',
    },
     progressBarContainer: {
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        margin: '10px 0',
        height: '20px',
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4caf50',
        textAlign: 'center',
        lineHeight: '20px', // Center text vertically
        color: 'white',
        transition: 'width 0.4s ease',
        fontSize: '0.8em',
    },
};

// Apply disabled style conditionally (use CSS classes for cleaner approach)
// styles.button[':disabled'] = styles.buttonDisabled; // This syntax won't work directly

export default UploadForm;