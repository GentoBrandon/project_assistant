'use client';
import { useState } from 'react';

export default function Home() {
  const [isRecognizing, setIsRecognizing] = useState(false);

  const startRecognition = async () => {
    try {
      const response = await fetch('http://localhost:5000/iniciar-reconocimiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsRecognizing(true);
        alert('Reconocimiento facial iniciado correctamente.');
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al iniciar el reconocimiento facial:', error);
      alert('Error al iniciar el reconocimiento facial.');
    }
  };

  const stopRecognition = async () => {
    try {
      const response = await fetch('http://localhost:5000/detener-reconocimiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsRecognizing(false);
        alert('Reconocimiento facial detenido correctamente.');
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al detener el reconocimiento facial:', error);
      alert('Error al detener el reconocimiento facial.');
    }
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>Reconocimiento Facial desde el Frontend</h1>

      <button onClick={startRecognition} disabled={isRecognizing} style={{ margin: '10px' }}>
        Iniciar Reconocimiento Facial
      </button>
      <button onClick={stopRecognition} disabled={!isRecognizing} style={{ margin: '10px' }}>
        Detener Reconocimiento Facial
      </button>
    </div>
  );
}
