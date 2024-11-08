import React from 'react';

const UploadButton = () => {
  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // Logic to upload the files to the cloud server goes here
      Array.from(files).forEach(file => {
        if (file.type === 'text/plain') {
          console.log('Text file selected:', file);
          // Add your upload logic here
        } else {
          console.warn('Not a text file:', file.name);
        }
      });
    }
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={handleFileUpload} 
        accept=".txt" // Accept only text files
        webkitdirectory="" // Allow folder uploads in supported browsers
        multiple // Allow multiple file selection
      />
      <button onClick={() => document.querySelector('input[type="file"]').click()}>
        Upload Files
      </button>
    </div>
  );
};

export default UploadButton;