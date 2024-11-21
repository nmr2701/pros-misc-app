import React, { InputHTMLAttributes } from 'react'; // Import InputHTMLAttributes

interface ExtendedInputProps extends InputHTMLAttributes<HTMLInputElement> {
    webkitdirectory?: boolean; // Add webkitdirectory property
  }

const UploadButton: React.FC = () => {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
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
        webkitdirectory // Allow folder uploads in supported browsers
        multiple // Allow multiple file selection
        {...({} as ExtendedInputProps)} // Cast to ExtendedInputProps

      />
      <button onClick={() => {
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement; // Cast to HTMLInputElement
        if (fileInput) {
          fileInput.click();
        }
      }}>
        Upload Files
      </button>
    </div>
  );
};
export default UploadButton;