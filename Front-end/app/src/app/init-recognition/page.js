'use client';
import { useState } from 'react';
import styles from '@/styles/Login.module.css';
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";


export default function Home() {
  const [isRecognizing, setIsRecognizing] = useState(false);

  const startRecognition = async () => {
    try {
      const response = await fetch('http://localhost:7000/iniciar-reconocimiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsRecognizing(true);
        toast.success("¡El reconocimiento facial, se inicio correctamente!", {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          sonido: true,
        });
      } else {
        const data = await response.json();
        toast.error(`Error: ${data.message}`, {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          sonido: true,
        });
      }
    } catch (error) {
      console.error('Error al iniciar el reconocimiento facial:', error);
      toast.error('¡Error al iniciar el reconocimiento facial.!', {
        duration: 4000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        sonido: true,
      });
    }
  };

  const stopRecognition = async () => {
    try {
      const response = await fetch('http://localhost:7000/detener-reconocimiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsRecognizing(false);
        toast.warning("¡El reconocimiento facial, se detuvo correctamente!", {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          sonido: true,
        });
      } else {
        const data = await response.json();
        toast.warning(`Error: ${data.message}`, {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          sonido: true,
        });
      }
    } catch (error) {
      console.error('Error al detener el reconocimiento facial:', error);
      toast.error('Error al detener el reconocimiento facial', {
        duration: 4000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        sonido: true,
      });
    }
  };

  return (
    <div className={styles.containerRec}>
      <div className={styles.BoxRec}>
          <img
              src="/logo-anacafe.webp"
              alt="Anacafé Guatemala"
              className={styles.logo}
            />
          <h1 className={styles.titleRec}>Reconocimiento Facial</h1>

          <div className={styles.btnGroup}>
            <button onClick={startRecognition} disabled={isRecognizing} className={styles.btnInit}>
              Iniciar 
            </button>
            
            <button onClick={stopRecognition} disabled={!isRecognizing} className={styles.btnStop}>
              Detener 
            </button>
          </div>
      </div>
    </div>
  );
}
