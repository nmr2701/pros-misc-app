import './App.css';
import UploadButton from './components/UploadButton'; // Import the new UploadButton component
import DataTable from './components/Datatable'; // Import the new DataTable component


function App() {
  return (
    <>
      <h1>File Upload Interface</h1>
      <UploadButton /> 
      <DataTable /> 

    </>
  );
}

export default App;