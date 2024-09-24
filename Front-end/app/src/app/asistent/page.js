"use client";

import { useState, useEffect } from 'react';

export default function VoiceAssistant() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [activity, setActivity] = useState('');
  const [response, setResponse] = useState('Hola, ¿cómo te llamas?');
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  // Función para hacer que el asistente hable
  const speak = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES'; // Español
      window.speechSynthesis.speak(utterance);
    }
  };

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'es-ES';

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      handleSpokenText(spokenText);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Error en el reconocimiento de voz:", event.error);
      setResponse('No se pudo entender lo que dijiste. Inténtalo de nuevo.');
      setIsListening(false);
    };
  }

  const handleSpokenText = (spokenText) => {
    if (step === 1) {
      setName(spokenText);
      const greeting = `Hola, ${spokenText}. ¿Qué actividad hiciste hoy?`;
      setResponse(greeting);
      speak(greeting); // Hacer que el asistente hable la respuesta
      setStep(2);
    } else if (step === 2) {
      setActivity(spokenText);
      const confirmation = `Tu actividad fue: ${spokenText}. Guardando en la base de datos...`;
      setResponse(confirmation);
      speak(confirmation); // Hacer que el asistente hable la respuesta
      saveData(name, spokenText);
    }
  };

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
      setIsListening(true);
    } else {
      setResponse('El reconocimiento de voz ya está activo.');
    }
  };

  const saveData = async (name, activity) => {
    try {
      const res = await fetch('/api/save-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, activity }),
      });

      if (res.ok) {
        setResponse('Datos guardados exitosamente.');
        speak('Datos guardados exitosamente.'); // Hacer que el asistente hable la confirmación
      } else {
        setResponse('Error al guardar los datos.');
        speak('Error al guardar los datos.'); // Hacer que el asistente hable el error
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
      speak(`Error: ${error.message}`); // Hacer que el asistente hable el error
    }
  };

  useEffect(() => {
    speak('Hola, ¿cómo te llamas?'); // Hacer que el asistente hable al cargar
  }, []);

  return (
    <div>
      <h1>Asistente Virtual</h1>
      <p>{response}</p>
      <button onClick={startListening} disabled={isListening}>Hablar</button>
    </div>
  );
}
