import React, { InputHTMLAttributes } from 'react'; // Import InputHTMLAttributes
import { api } from '~/utils/api';

interface ExtendedInputProps extends InputHTMLAttributes<HTMLInputElement> {
    webkitdirectory?: boolean; // Add webkitdirectory property
  }

const UploadButton: React.FC = () => {

  const uploadFilesMutation = api.post.uploadFiles.useMutation(); // Initialize the mutation

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const filesData: Promise<any>[] = Array.from(files).map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const caseText = e.target?.result as string; // Get the file content
            resolve({
              name: file.name,
              caseText, // Set caseText to the content of the file
              misconductType: null, // Set to null or actual value
              verdict: null, // Set to null or actual value
            });
          };
          reader.readAsText(file); // Read the file as text
        });
      });
  
      Promise.all(filesData).then((data) => {
        uploadFilesMutation.mutate({ files: data }); // Call the mutation
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