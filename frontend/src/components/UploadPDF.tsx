// frontend/src/components/UploadPDF.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  setFields: (fields: string[]) => void;
}

const UploadPDF: React.FC<Props> = ({ setFields }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFields(response.data.fields);
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} disabled={!file}>Upload and Analyze</button>
    </div>
  );
};

export default UploadPDF;
