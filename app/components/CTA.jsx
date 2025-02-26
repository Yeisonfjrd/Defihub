"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const rect = ref.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    };

    if (ref.current) {
      ref.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [ref.current]);

  return (
    <motion.section
      ref={ref}
      className="py-24 bg-blue-600 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {Array.from({ length: 30 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white/10"
          style={{
            width: Math.random() * 10 + 5 + "px",
            height: Math.random() * 10 + 5 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 50],
            y: [0, (Math.random() - 0.5) * 50],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}

      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            Únete al futuro de las finanzas descentralizadas
          </motion.h2>

          <motion.p
            className="text-xl text-blue-100 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Con nuestra plataforma inmersiva, los protocolos DeFi nunca han sido tan accesibles y emocionantes de usar
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-8 py-6 text-lg">
              Comenzar ahora
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Button>
          </motion.div>

          <motion.div
            className="absolute top-20 left-20 w-16 h-16 bg-blue-500/20 rounded-full"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <motion.div
            className="absolute bottom-20 right-20 w-24 h-24 bg-blue-400/20 rounded-full"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -15, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          
          <motion.div
            className="absolute top-1/2 right-32 w-8 h-8 bg-blue-300/30 rounded-full"
            animate={{
              y: [0, -8, 0],
              x: [0, 8, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.section>
  );
}