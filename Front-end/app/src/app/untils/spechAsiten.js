// src/speechUtils.js
export const initializeRecognition = (handleSpokenText, setIsListening, setResponse) => {
    const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
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
  
    return recognition;
  };
  
  export const speak = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES'; // Español
      window.speechSynthesis.speak(utterance);
    }
  };
  