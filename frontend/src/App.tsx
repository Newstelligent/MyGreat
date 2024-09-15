// frontend/src/App.tsx
import React, { useState } from 'react';
import UploadPDF from './components/UploadPDF';
import QuestionForm from './components/QuestionForm';

function App() {
  const [fields, setFields] = useState<string[]>([]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>PDF Form Filler</h1>
      {fields.length === 0 ? (
        <UploadPDF setFields={setFields} />
      ) : (
        <QuestionForm fields={fields} />
      )}
    </div>
  );
}

export default App;
