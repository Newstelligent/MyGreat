// frontend/src/App.tsx

import React, { useState } from 'react';
import UploadPDF from './components/UploadPDF';
import QuestionForm from './components/QuestionForm';
import { Field } from './types/Field'; // Import the shared Field interface

function App() {
  const [fields, setFields] = useState<Field[]>([]);

  const handleSetFields = (fieldsData: Field[]) => {
    setFields(fieldsData);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>PDF Form Filler</h1>
      {fields.length === 0 ? (
        <UploadPDF setFields={handleSetFields} />
      ) : (
        <QuestionForm fields={fields} />
      )}
    </div>
  );
}

export default App;
