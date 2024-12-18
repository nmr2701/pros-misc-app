import React, { InputHTMLAttributes } from 'react'; // Import InputHTMLAttributes
import { api } from '~/utils/api';
import { useUser } from '@clerk/nextjs';


const UploadButton: React.FC = () => {
  interface ExtendedInputProps extends InputHTMLAttributes<HTMLInputElement> {
    webkitdirectory?: boolean; // Extend the interface to include webkitdirectory
  }
  const uploadFilesMutation = api.post.uploadFiles.useMutation(); // Initialize the mutation

  const { user } = useUser()

  interface FileData { // Define a specific type for file data
    name: string;
    caseText: string;
    misconductType: string | null;
    verdict: string | null;
    userEmail: string;
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const filesData: Promise<FileData>[] = Array.from(files).map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const caseText = e.target?.result as string; // Get the file content
            const userEmail = user?.primaryEmailAddress?.toString() ?? ''; // Ensure this is a function call
            resolve({
              name: file.name,
              caseText, // Set caseText to the content of the file
              misconductType: null, // Set to null or actual value
              verdict: null, // Set to null or actual value
              userEmail
            });
          };
          reader.readAsText(file); // Read the file as text
        });
      });
  
      try {
        const data = await Promise.all(filesData);
        await uploadFilesMutation.mutateAsync({ files: data });
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
    console.log(event.target.files);
  };
  return (
    <div>
      <input 
        type="file" 
        onChange={handleFileUpload} 
        multiple // Allow multiple file selection
        accept='.txt' // Accept only .txt files
        {...({} as ExtendedInputProps)} // Cast to ExtendedInputProps
        />
    </div>
      
      
    )
};
export default UploadButton;