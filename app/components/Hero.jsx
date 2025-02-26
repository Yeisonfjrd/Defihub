"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import TokenModel3D from "./TokenModel3D";
import useSound from 'use-sound';

const PARTICLES = Array.from({ length: 100 }).map((_, i) => ({
  width: 2 + (i % 10),
  height: 2 + (i % 10),
  left: Math.random() * 100,
  top: Math.random() * 100,
  opacity: 0.3 + Math.random() * 0.5,
  yOffset: Math.random() * 30 - 15,
  speed: 2 + Math.random() * 3
}));

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const titleY = useTransform(scrollY, [0, 300], [0, -100]);
  const backgroundY = useTransform(scrollY, [0, 300], [0, 100]);
  const particleOpacity = useTransform(scrollY, [0, 200], [1, 0.3]);
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.5 });
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.7 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="relative h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
    >
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ opacity: particleOpacity, y: backgroundY }}
      >
        {PARTICLES.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-blue-500"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              opacity: particle.opacity,
              x: mousePosition.x * (index % 10) * -20,
              y: mousePosition.y * (index % 15) * -20
            }}
            animate={{
              y: [0, particle.yOffset],
              opacity: [particle.opacity, particle.opacity * 0.5],
              transition: {
                duration: particle.speed,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </motion.div>
      
      <motion.div 
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(56,189,248,0) 70%)",
          left: `calc(${mousePosition.x * 100 + 50}% - 12rem)`,
          top: `calc(${mousePosition.y * 100 + 50}% - 12rem)`,
          pointerEvents: "none"
        }}
      />
      
      <div className="container mx-auto px-4 z-10">
        <motion.div 
          className="text-center"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Bienvenido a <span className="text-blue-400">DeFiHub</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Tu puerta de entrada a las finanzas descentralizadas con soluciones seguras e inmersivas
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          >
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
              onMouseEnter={playHover}
              onClick={playClick}
            >
              Explorar Servicios
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-blue-400 text-blue-400 hover:bg-blue-400/10 transition-all duration-300 transform hover:scale-105"
              onMouseEnter={playHover}
              onClick={playClick}
            >
              Unirse a la Comunidad
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            animate={{ 
              y: [0, 12, 0],
              opacity: [1, 0.3, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}