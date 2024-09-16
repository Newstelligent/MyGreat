import React, { useState } from 'react';
import UploadPDF from './components/UploadPDF';
import QuestionForm from './components/QuestionForm';

interface Field {
  name: string;
  field_type: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

function App() {
  const [fields, setFields] = useState<Field[]>([]);

  const handleSetFields = (fieldNames: string[]) => {
    // Assuming that fieldNames is an array of field names, we will convert them into Field objects
    const newFields: Field[] = fieldNames.map(name => ({
      name,
      field_type: '0', // Default to '0' for text type or dynamically handle based on real data
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
    }));

    setFields(newFields);
  };

  return (
    <div>
      {fields.length === 0 ? (
        <UploadPDF setFields={handleSetFields} />
      ) : (
        <QuestionForm fields={fields} />
      )}
    </div>
  );
}

export default App;
