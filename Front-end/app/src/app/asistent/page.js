
'use client';
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import styles from '@/styles/StyleReco.module.css';
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";



export default function Home() {
  const [recognizedEmployee, setRecognizedEmployee] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [activityData, setActivityData] = useState({
    employeeId: 0,
    activityId: 0,
    subActivityId: 0,
    lotId: 0,
    hasSentData: false
  });
  const isSendingDataRef = useRef(false);

  // Función para enviar el texto transcrito al backend para corrección
  const correctTextWithOpenAI = async (transcript) => {
    try {
      const response = await fetch('http://localhost:7000/corregir-texto', {
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
      setActivityData((prev) => ({
        ...prev,
        activityId: data.activity,
        subActivityId: data.subActivity,
        hasSentData: false
      }));

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
      const response = await fetch('http://localhost:7000/api/corregir-lote', {
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
      setActivityData((prev) => ({
        ...prev,
        lotId: data.id,
        hasSentData: false
      }));
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
  const sendActivityDataToBackend = async ({ employeeId, activityId, subActivityId, lotId }) => {
    if (isSendingDataRef.current) return;
    isSendingDataRef.current = true;
    try {
      console.log('Enviando datos al backend...');
      console.log(employeeId, activityId, subActivityId, lotId);

      const response = await fetch('http://localhost:7000/register-activity', {
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
        toast.error(`Error: ${errorUtterance}`, {
          duration: 1500,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          sonido: true,
        });
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
    } catch (error) {
      console.error('Error al enviar datos al backend:', error);
      setChatHistory((prev) => [
        ...prev,
        'Sistema: Error inesperado al guardar la actividad. Por favor, intenta nuevamente.'
      ]);
      const errorUtterance = new SpeechSynthesisUtterance('Error inesperado al guardar la actividad. Por favor, intenta nuevamente.');
      window.speechSynthesis.speak(errorUtterance);
    } finally {
      // Reiniciar el estado después de enviar los datos
      setRecognizedEmployee(null);
      setActivityData({
        employeeId: 0,
        activityId: 0,
        subActivityId: 0,
        lotId: 0,
        hasSentData: false
      });
      setChatHistory([]);
      isSendingDataRef.current = false;
    }
  };

  useEffect(() => {
    const socket = io('http://localhost:7000'); // Conectar con el backend

    socket.on('empleado-reconocido', (data) => {
      setActivityData((prev) => ({ ...prev, employeeId: data.employeeId, hasSentData: false }));
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
    const { employeeId, activityId, subActivityId } = activityData;
    if (employeeId !== 0 && activityId !== 0 && subActivityId !== 0) {
      setActivityData((prev) => ({ ...prev, hasSentData: false }));
    }
  }, [activityData.employeeId, activityData.activityId, activityData.subActivityId]);

  useEffect(() => {
    const { employeeId, activityId, subActivityId, lotId, hasSentData } = activityData;
    if (employeeId !== 0 && activityId !== 0 && subActivityId !== 0 && lotId !== 0 && !hasSentData && !isSendingDataRef.current) {
      setActivityData((prev) => ({ ...prev, hasSentData: true })); // Marcar como enviado antes de iniciar el proceso
      sendActivityDataToBackend({ employeeId, activityId, subActivityId, lotId });
    }
  }, [activityData.lotId]); // Dependencia específica para enviar al backend

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
        `Sistema: El lote ha sido guardado.`
      ]);

      const loteSaveUtterance = new SpeechSynthesisUtterance(`El lote ha sido guardado.`);
      loteSaveUtterance.onend = () => {
        setActivityData((prev) => ({ ...prev, lotId: correctedLoteId }));
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
    <div className={styles.containerRec}>
      <div className={styles.BoxRec}> 
            <img
              src="/logo-anacafe.webp"
              alt="Anacafé Guatemala"
              className={styles.logo}
            />
          <h1 className={styles.titleRec}>Asistente agricola</h1>
          {recognizedEmployee && (
            <div style={{ marginTop: '20px' }}>
              <h2>Empleado Reconocido:</h2>
              <p><strong>ID:</strong> {recognizedEmployee.employeeId}</p>
              <p><strong>Nombre:</strong> {recognizedEmployee.employeeName}</p>
            </div>
          )}

          {isListening && <p>Escuchando...</p>}

          <div className={styles.chatContainer}>
            {chatHistory.map((message, index) => (
              <div key={index} className={styles.chatBubble}>
                <p>{message}</p>
              </div>
            ))}
          </div>


      </div>
    </div>
  );
}
