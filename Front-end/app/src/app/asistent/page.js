"use client"; // Aseguramos que solo se ejecute en el cliente

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [recognizedEmployee, setRecognizedEmployee] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const isRecognitionActive = useRef(false);  // Controlaremos si el reconocimiento ya está activo

  const step = useRef(1);
  const name = useRef('');
  const surname = useRef('');
  const activity = useRef('');

  // Función para que el asistente hable
  const speak = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Función que maneja el texto hablado por el usuario
  const handleSpokenText = (spokenText) => {
    if (step.current === 1) {
      name.current = spokenText;
      setResponse(`Hola, ${spokenText}. ¿Cuál es tu apellido?`);
      speak(`Hola, ${spokenText}. ¿Cuál es tu apellido?`);
      step.current = 2; // Pasamos al siguiente paso
      setTimeout(() => startListening(), 4000); // Aumentamos el tiempo de espera a 4 segundos
    } else if (step.current === 2) {
      surname.current = spokenText;
      setResponse(`Encantado de conocerte, ${name.current} ${surname.current}. ¿Qué actividad realizaste hoy?`);
      speak(`Encantado de conocerte, ${name.current} ${surname.current}. ¿Qué actividad realizaste hoy?`);
      step.current = 3; // Pasamos al siguiente paso
      setTimeout(() => startListening(), 5000); // Aumentamos el tiempo de espera a 5 segundos
    } else if (step.current === 3) {
      activity.current = spokenText;
      setResponse(`Entendido, tu actividad fue: ${spokenText}. Guardando en la base de datos...`);
      speak(`Entendido, tu actividad fue: ${spokenText}. Guardando en la base de datos...`);
      step.current = 4;
      saveData(); // Simulamos el guardado de datos
    }
  };

  // Función para simular el guardado en la base de datos
  const saveData = () => {
    setTimeout(() => {
      setResponse('Datos guardados exitosamente.');
      speak('Datos guardados exitosamente.');
      resetAssistant(); // Reiniciamos el asistente después de guardar
    }, 2000);
  };

  // Función para reiniciar el asistente
  const resetAssistant = () => {
    step.current = 1; // Reiniciamos los pasos
    name.current = '';
    surname.current = '';
    activity.current = '';
    setResponse('Presiona el botón para iniciar el asistente');
    setIsListening(false);
    isRecognitionActive.current = false;  // Marcamos que el reconocimiento ha terminado
  };

  // Función para iniciar el reconocimiento de voz
  const startListening = () => {
    if (recognitionRef.current && !isRecognitionActive.current) {
      recognitionRef.current.start(); // Iniciamos el reconocimiento
      setIsListening(true);
      isRecognitionActive.current = true; // Marcamos que el reconocimiento está activo
    }
  };

  // Inicialización del reconocimiento de voz solo en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false; // Detenemos el reconocimiento después de cada frase
        recognition.interimResults = false;
        recognition.lang = 'es-ES';

        recognition.onstart = () => {
          isRecognitionActive.current = true; // Cuando comienza, marcamos como activo
        };

        recognition.onresult = (event) => {
          const spokenText = event.results[0][0].transcript;
          handleSpokenText(spokenText); // Procesamos el texto hablado
        };

        recognition.onend = () => {
          setIsListening(false);
          isRecognitionActive.current = false; // Cuando termina, marcamos como inactivo
        };

    recognition.onerror = (event) => {
      console.error('Error en el reconocimiento de voz:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>Reconocimiento Facial y Chat en Tiempo Real</h1>

      {recognizedEmployee && (
        <div style={{ marginTop: '20px' }}>
          <h2>Empleado Reconocido:</h2>
          <p><strong>ID:</strong> {recognizedEmployee.employeeId}</p>
          <p><strong>Nombre:</strong> {recognizedEmployee.employeeName}</p>
        </div>
      )}

      {isListening && <p>Escuchando...</p>}

      <div style={{ marginTop: '20px', textAlign: 'left', marginLeft: '20%' }}>
        {chatHistory.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  )
