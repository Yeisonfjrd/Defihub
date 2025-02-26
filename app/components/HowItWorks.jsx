"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { WalletIcon, GridIcon, PlayIcon } from "lucide-react";

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const steps = [
    {
      number: "01",
      icon: <WalletIcon className="h-8 w-8 text-blue-500" />,
      title: "Conecta tu billetera",
      description:
        "Integra de forma segura tu billetera de criptomonedas con nuestra plataforma DeFi",
    },
    {
      number: "02",
      icon: <GridIcon className="h-8 w-8 text-blue-500" />,
      title: "Elige un servicio",
      description:
        "Selecciona entre préstamos, staking o intercambio según tus objetivos financieros",
    },
    {
      number: "03",
      icon: <PlayIcon className="h-8 w-8 text-blue-500" />,
      title: "Comienza a interactuar",
      description:
        "Disfruta de comisiones bajas y experiencia fluida en nuestra plataforma optimizada",
    },
  ];

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" } 
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-white"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">Cómo Funciona</h2>
          <p className="text-gray-600 text-lg">
            Tres sencillos pasos para sumergirte en el mundo de las finanzas descentralizadas
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-0">
            <svg width="100%" height="20" viewBox="0 0 1000 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M0 10 H 1000" 
                stroke="#E2E8F0" 
                strokeWidth="2"
                strokeDasharray="5 5"
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
            </svg>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView 
                  ? { opacity: 1, y: 0 } 
                  : { opacity: 0, y: 50 }
                }
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.2,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
                whileHover={{ y: -10 }}
                className="z-10"
              >
                <Card className="border-none shadow-lg h-full relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-50 z-0" />
                  
                  <CardContent className="p-8 z-10 relative">
                    <div className="mb-6 flex justify-between items-center">
                      <motion.div 
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        {step.icon}
                      </motion.div>
                      <span className="text-4xl font-bold text-gray-100">
                        {step.number}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-blue-500"
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: "100%" } : { width: "0%" }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.3 + 0.5,
                        ease: "easeOut" 
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}