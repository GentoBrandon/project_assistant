'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function Home() {
  const [recognizedEmployee, setRecognizedEmployee] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [activity, setActivityId] = useState(0);
  const [subActivity, setSubActivityId] = useState(0);
  const [id, setIdEmployee] = useState(0);
  const [lote, setLoteId] = useState(0);
  const [hasSentData, setHasSentData] = useState(false); // Nuevo estado para evitar duplicados

  // Función para enviar el texto transcrito al backend para corrección
  const correctTextWithOpenAI = async (transcript) => {
    try {
      const response = await fetch('http://localhost:5000/corregir-texto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transcript })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setChatHistory((prev) => [
          ...prev,
          `Sistema: Error - ${errorData.error}`
        ]);
        const errorUtterance = new SpeechSynthesisUtterance(`Error: ${errorData.error}. Por favor, intenta decir la actividad nuevamente.`);
        errorUtterance.onend = () => {
          startListening(); // Reiniciar la escucha después del error
        };
        window.speechSynthesis.speak(errorUtterance);
        return null;
      }

      const data = await response.json();
      setActivityId(data.activity);
      setSubActivityId(data.subActivity);

      return {
        correctedText: data.correctedText,
        subActivity: data.subActivity,
        activity: data.activity
      };
    } catch (error) {
      console.error('Error al corregir el texto:', error);
      setChatHistory((prev) => [
        ...prev,
        'Sistema: Error inesperado al procesar el texto. Por favor, intenta decir la actividad nuevamente.'
      ]);
      const errorUtterance = new SpeechSynthesisUtterance('Error inesperado al procesar el texto. Por favor, intenta decir la actividad nuevamente.');
      errorUtterance.onend = () => {
        startListening(); // Reiniciar la escucha después del error inesperado
      };
      window.speechSynthesis.speak(errorUtterance);
      return null;
    }
  };

  // Función para corregir el lote con OpenAI
  const correctLoteWithOpenAI = async (transcript) => {
    try {
      const response = await fetch('http://localhost:5000/api/corregir-lote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transcript })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setChatHistory((prev) => [
          ...prev,
          `Sistema: Error - ${errorData.error}`
        ]);
        const errorUtterance = new SpeechSynthesisUtterance(`Error: ${errorData.error}. Por favor, intenta decir el lote nuevamente.`);
        errorUtterance.onend = () => {
          startListeningForLote(); // Reiniciar la escucha después del error
        };
        window.speechSynthesis.speak(errorUtterance);
        return null;
      }

      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error('Error al corregir el lote:', error);
      setChatHistory((prev) => [
        ...prev,
        'Sistema: Error inesperado al procesar el lote. Por favor, intenta decir el lote nuevamente.'
      ]);
      const errorUtterance = new SpeechSynthesisUtterance('Error inesperado al procesar el lote. Por favor, intenta decir el lote nuevamente.');
      errorUtterance.onend = () => {
        startListeningForLote(); // Reiniciar la escucha después del error inesperado
      };
      window.speechSynthesis.speak(errorUtterance);
      return null;
    }
  };

  // Nueva función para enviar la actividad al backend
  const sendActivityDataToBackend = async (employeeId, activityId, subActivityId, lotId) => {
    try {
      console.log('Enviando datos al backend...');
      console.log(employeeId, activityId, subActivityId, lotId); // Verifica los valores aquí

      const response = await fetch('http://localhost:5000/register-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employeeId: employeeId,
          activityId: activityId,
          subActivityId: subActivityId,
          lotId: lotId
        })
      });

      if (!response.ok) {
        setChatHistory((prev) => [
          ...prev,
          'Sistema: Error al guardar la actividad. Por favor, intenta nuevamente.'
        ]);
        const errorUtterance = new SpeechSynthesisUtterance('Error al guardar la actividad. Por favor, intenta nuevamente.');
        window.speechSynthesis.speak(errorUtterance);
        return;
      }

      const data = await response.json();
      console.log(data);
      setChatHistory((prev) => [
        ...prev,
        `Sistema: Los datos de la actividad y lote han sido registrados con éxito.`
      ]);

      const confirmationUtterance = new SpeechSynthesisUtterance('Los datos de la actividad y lote han sido registrados con éxito.');
      window.speechSynthesis.speak(confirmationUtterance);

      // Marcar que los datos ya fueron enviados
      setHasSentData(true);
    } catch (error) {
      console.error('Error al enviar datos al backend:', error);
      setChatHistory((prev) => [
        ...prev,
        'Sistema: Error inesperado al guardar la actividad. Por favor, intenta nuevamente.'
      ]);
      const errorUtterance = new SpeechSynthesisUtterance('Error inesperado al guardar la actividad. Por favor, intenta nuevamente.');
      window.speechSynthesis.speak(errorUtterance);
    }
  };

  useEffect(() => {
    const socket = io('http://localhost:5000'); // Conectar con el backend

    socket.on('empleado-reconocido', (data) => {
      setIdEmployee(data.employeeId);
      setRecognizedEmployee(data);
      setChatHistory((prev) => [
        ...prev,
        `Sistema: Hola ${data.employeeName}, ¿Qué actividad realizaste hoy?`
      ]);

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`Hola ${data.employeeName}, ¿Qué actividad realizaste hoy?`);

      utterance.onend = () => {
        startListening();
      };

      window.speechSynthesis.speak(utterance);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (id !== 0 && activity !== 0 && subActivity !== 0 && lote !== 0 && !hasSentData) {
      sendActivityDataToBackend(id, activity, subActivity, lote);
    }
  }, [id, activity, subActivity, lote, hasSentData]); // Añadido hasSentData para evitar enviar dos veces

  const startListening = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert('Tu navegador no soporta el reconocimiento de voz');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;

      const correctedText = await correctTextWithOpenAI(transcript);

      if (!correctedText) {
        setIsListening(false);
        return; // Detener si no se pudo corregir la actividad
      }

      setChatHistory((prev) => [
        ...prev,
        `Empleado: ${transcript}`,
        `Sistema: Se ha guardado la actividad corregida: ${correctedText.correctedText}`
      ]);

      const saveUtterance = new SpeechSynthesisUtterance(`Se ha guardado la actividad: ${correctedText.correctedText}`);
      saveUtterance.onend = () => {
        askForLote(); // Preguntar en qué lote se realizó la actividad
      };
      window.speechSynthesis.speak(saveUtterance);

      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Error en el reconocimiento de voz:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const askForLote = () => {
    const loteQuestion = new SpeechSynthesisUtterance('¿En qué lote realizaste la actividad?');
    loteQuestion.onend = () => {
      startListeningForLote();
    };
    window.speechSynthesis.speak(loteQuestion);
  };

  const startListeningForLote = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;

      const correctedLoteId = await correctLoteWithOpenAI(transcript);

      if (!correctedLoteId) {
        setIsListening(false);
        return; // Detener si no se pudo corregir el lote
      }

      setChatHistory((prev) => [
        ...prev,
        `Lote: ${transcript}`,
        `Sistema: El lote ha sido guardado`
      ]);

      const loteSaveUtterance = new SpeechSynthesisUtterance(`El lote ha sido guardado.`);
      loteSaveUtterance.onend = () => {
        setLoteId(correctedLoteId);
      };
      window.speechSynthesis.speak(loteSaveUtterance);

      setIsListening(false);
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
  );
}