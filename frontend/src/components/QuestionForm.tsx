// frontend/src/components/QuestionForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

// Define a mapping from field type codes to descriptive names
const fieldTypeMap: { [key: string]: string } = {
  '0': 'Text',
  '1': 'Checkbox',
  '2': 'RadioButton',
  '3': 'PushButton',
  '4': 'ComboBox',
  '5': 'ListBox',
};

interface Field {
  name: string;
  type: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

interface Props {
  fields: Field[];
}

const QuestionForm: React.FC<Props> = ({ fields }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [file, setFile] = useState<File | null>(null);

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentIndex(prev => prev - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [fields[currentIndex].name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [fields[currentIndex].name]: e.target.checked ? 'Yes' : 'Off',
    });
  };

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify(answers));

    try {
      const response = await axios.post('http://localhost:8000/fill/', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'filled_form.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error submitting PDF:', error);
    }
  };

  if (currentIndex >= fields.length) {
    return (
      <div>
        <h2>Upload Original PDF to Populate</h2>
        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button onClick={handleSubmit} disabled={!file}>Submit and Download PDF</button>
      </div>
    );
  }

  const currentField = fields[currentIndex];

  return (
    <div>
      <h2>Question {currentIndex + 1} of {fields.length}</h2>
      <p>{currentField.name} ({fieldTypeMap[currentField.type]})</p> {/* Display field type */}

      {currentField.type === '0' && (
        <input
          type="text"
          value={answers[currentField.name] || ''}
          onChange={handleChange}
        />
      )}
      {currentField.type === '1' && (
        <input
          type="checkbox"
          checked={answers[currentField.name] === 'Yes'}
          onChange={handleCheckboxChange}
        />
      )}
      {/* Add handling for other field types as needed */}
      <div>
        {currentIndex > 0 && <button onClick={handleBack}>Back</button>}
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default QuestionForm;
