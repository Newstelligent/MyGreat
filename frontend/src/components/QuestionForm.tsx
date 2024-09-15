// frontend/src/components/QuestionForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  fields: string[];
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
      [fields[currentIndex]]: e.target.value,
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

  return (
    <div>
      <h2>Question {currentIndex + 1} of {fields.length}</h2>
      <p>{fields[currentIndex]}</p>
      <input type="text" value={answers[fields[currentIndex]] || ''} onChange={handleChange} />
      <div>
        {currentIndex > 0 && <button onClick={handleBack}>Back</button>}
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default QuestionForm;
