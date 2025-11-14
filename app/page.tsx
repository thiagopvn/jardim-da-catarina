'use client';

import React, { useRef, useState, useEffect } from 'react';
import OriginalInvitation from '@/components/OriginalInvitation';
import AudioButton from '@/components/ui/AudioButton';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false); // Iniciar desmutado para tocar automaticamente
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Configurar e tentar tocar o áudio quando o componente montar
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Volume inicial em 30%

      // Tentar tocar automaticamente
      const playAudio = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
          setHasInteracted(true);
        } catch (error) {
          console.log('Autoplay bloqueado. Usuário precisa interagir:', error);
          // Se o autoplay falhar, o usuário pode clicar no botão
        }
      };

      playAudio();
    }
  }, []);

  useEffect(() => {
    // Atualizar o estado mudo do áudio quando isMuted mudar
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = async () => {
    if (!hasInteracted) {
      setHasInteracted(true);

      // Na primeira interação, tentar iniciar a música
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setIsMuted(false);
        } catch (error) {
          console.log('Erro ao reproduzir áudio:', error);
        }
      }
    } else {
      // Após a primeira interação, apenas alternar mute
      setIsMuted(prev => !prev);
    }
  };

  // Listener para quando o áudio começar/parar de tocar
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Elemento de áudio invisível */}
      <audio
        ref={audioRef}
        src="/sounds/cartoonsong.mp3"
        loop
        preload="auto"
        autoPlay
        muted={isMuted}
      />

      {/* Botão de controle de áudio */}
      <AudioButton
        isMuted={isMuted}
        onClick={toggleMute}
        isPlaying={isPlaying}
      />

      {/* Componente principal do convite */}
      <OriginalInvitation showIntro={false} />
    </main>
  );
}