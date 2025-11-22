'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';

interface VideoGalleryProps {
  className?: string;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ className = '' }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState([true, true]);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];

  const videos = [
    {
      src: '/cat1.mp4',
      title: 'Fui...',
      emoji: '🏃‍♀️'
    },
    {
      src: '/cat2.mp4',
      title: 'Indo ver se você já confirmou',
      emoji: '👀'
    },
  ];

  // Auto-play videos when they come into view
  useEffect(() => {
    const observers = videoRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (ref.current) {
            if (entry.isIntersecting) {
              ref.current.play().catch(console.error);
            } else {
              ref.current.pause();
            }
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const togglePlayPause = (index: number) => {
    const video = videoRefs[index].current;
    if (video) {
      if (video.paused) {
        video.play();
        const newIsPlaying = [...isPlaying];
        newIsPlaying[index] = true;
        setIsPlaying(newIsPlaying);
      } else {
        video.pause();
        const newIsPlaying = [...isPlaying];
        newIsPlaying[index] = false;
        setIsPlaying(newIsPlaying);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRefs.forEach(ref => {
      if (ref.current) {
        ref.current.muted = !isMuted;
      }
    });
  };

  return (
    <section className={`py-16 px-4 relative overflow-hidden bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50 ${className}`}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000,
              y: -50,
              rotate: 0
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          >
            <span className="text-2xl opacity-20">
              {['🌸', '🦋', '⭐', '💖', '🌺'][Math.floor(Math.random() * 5)]}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
              style={{ fontFamily: 'var(--font-dancing-script), cursive' }}
            >
              Vamos logo confirmar presença
            </h2>
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.div>
          <p className="text-lg sm:text-xl text-purple-600 font-light">
            A Catarina está fiscalizando se você confirmou! 🏃‍♀️
          </p>
        </motion.div>

        {/* Videos Container - Creative Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              {/* Video Frame Container */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Decorative Frame */}
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-3xl opacity-50 blur-xl group-hover:opacity-70 transition-opacity duration-300" />

                {/* Main Video Container */}
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Title Bar */}
                  <div className="bg-gradient-to-r from-candy-pink to-candy-lilac p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.span
                          className="text-2xl"
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {video.emoji}
                        </motion.span>
                        <h3 className="text-white font-bold text-lg">
                          {video.title}
                        </h3>
                      </div>
                      <motion.div
                        className="flex items-center gap-1"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Heart className="w-5 h-5 text-white fill-current" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Video Player */}
                  <div className="relative aspect-[9/16] bg-black">
                    <video
                      ref={videoRefs[index]}
                      src={video.src}
                      className="w-full h-full object-contain"
                      loop
                      muted={isMuted}
                      playsInline
                      autoPlay
                      onPlay={() => {
                        const newIsPlaying = [...isPlaying];
                        newIsPlaying[index] = true;
                        setIsPlaying(newIsPlaying);
                      }}
                      onPause={() => {
                        const newIsPlaying = [...isPlaying];
                        newIsPlaying[index] = false;
                        setIsPlaying(newIsPlaying);
                      }}
                    />

                    {/* Video Controls Overlay */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => togglePlayPause(index)}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        >
                          {isPlaying[index] ? (
                            <Pause className="w-5 h-5 text-white" />
                          ) : (
                            <Play className="w-5 h-5 text-white" />
                          )}
                        </button>
                        {index === 0 && (
                          <button
                            onClick={toggleMute}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          >
                            {isMuted ? (
                              <VolumeX className="w-5 h-5 text-white" />
                            ) : (
                              <Volume2 className="w-5 h-5 text-white" />
                            )}
                          </button>
                        )}
                      </div>
                    </motion.div>

                    {/* Magical Overlay Effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-pink-400/20 via-transparent to-purple-400/20" />
                    </motion.div>
                  </div>

                  {/* Bottom Decoration */}
                  <div className="bg-gradient-to-r from-pastel-pink to-pastel-lilac p-3">
                    <div className="flex justify-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Hearts Animation */}
                <AnimatePresence>
                  {isPlaying[index] && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={`heart-${index}-${i}`}
                          className="absolute bottom-20 pointer-events-none"
                          initial={{
                            x: Math.random() * 100 - 50,
                            y: 0,
                            opacity: 1,
                            scale: 0
                          }}
                          animate={{
                            y: -200,
                            opacity: 0,
                            scale: 1
                          }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 3,
                            delay: i * 1,
                            repeat: Infinity,
                            ease: "easeOut"
                          }}
                          style={{
                            left: `${30 + Math.random() * 40}%`
                          }}
                        >
                          <Heart className="w-8 h-8 text-pink-400 fill-current" />
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Decorative Elements Around Video */}
              <motion.div
                className="absolute -top-6 -left-6 text-4xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                🌺
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -right-6 text-4xl"
                animate={{
                  rotate: [0, -360],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                🦋
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Caption */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-lg text-purple-600 font-semibold">
            Agora é só clicar no botão abaixo para confirmar a sua presença
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VideoGallery;