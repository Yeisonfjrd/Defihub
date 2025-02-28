"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import TokenModel3D from "./TokenModel3D";
import useSound from 'use-sound';

const PARTICLES = Array.from({ length: 150 }).map((_, i) => ({
  width: Math.random() * 4 + 1,
  height: Math.random() * 4 + 1,
  left: Math.random() * 100,
  top: Math.random() * 100,
  opacity: 0.3 + Math.random() * 0.5,
  yOffset: Math.random() * 40 - 20,
  speed: 1.5 + Math.random() * 2,
  delay: Math.random() * 1
}));

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  const titleOpacity = useSpring(useTransform(scrollY, [0, 300], [1, 0]));
  const titleY = useSpring(useTransform(scrollY, [0, 300], [0, -100]));
  const backgroundY = useSpring(useTransform(scrollY, [0, 300], [0, 100]));
  const particleOpacity = useSpring(useTransform(scrollY, [0, 200], [1, 0.3]));
  
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.5 });
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.7 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950"
    >
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ opacity: particleOpacity, y: backgroundY }}
      >
        {PARTICLES.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              opacity: particle.opacity,
              x: mousePosition.x * (index % 10) * -30,
              y: mousePosition.y * (index % 15) * -30
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: particle.opacity,
              scale: 1,
              y: [0, particle.yOffset],
              transition: {
                duration: particle.speed,
                delay: particle.delay,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </motion.div>
      
      <motion.div 
        className="absolute w-[40rem] h-[40rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0) 70%)",
          left: `calc(${mousePosition.x * 100 + 50}% - 20rem)`,
          top: `calc(${mousePosition.y * 100 + 50}% - 20rem)`,
          filter: "blur(40px)",
          pointerEvents: "none"
        }}
      />
      
      <div className="container mx-auto px-4 z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-blue-500 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Bienvenido a <br/> <span className="text-blue-400">DeFiHub</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-blue-100/80 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Tu puerta de entrada a las finanzas descentralizadas con soluciones seguras e inmersivas
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              onMouseEnter={playHover}
              onClick={playClick}
            >
              Explorar Servicios
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              onMouseEnter={playHover}
              onClick={playClick}
            >
              Unirse a la Comunidad
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div 
          className="w-8 h-14 border-2 border-blue-400/30 rounded-full flex justify-center p-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div 
            className="w-2 h-2 bg-blue-400 rounded-full"
            animate={{ 
              y: [0, 16, 0],
              opacity: [1, 0.3, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}