"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LockIcon, LineChart, DollarSign } from "lucide-react";

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const features = [
    {
      icon: <LockIcon className="h-12 w-12 text-blue-500" />,
      title: "Préstamo y Préstamo Seguro",
      description: "Accede a capital o genera ingresos prestando tus activos con seguridad garantizada por contratos inteligentes."
    },
    {
      icon: <LineChart className="h-12 w-12 text-green-500" />,
      title: "Staking Líquido para Ganancias",
      description: "Obtén rendimientos mientras mantienes la liquidez de tus activos con nuestro innovador modelo de staking."
    },
    {
      icon: <DollarSign className="h-12 w-12 text-yellow-500" />,
      title: "Stablecoin para Estabilidad",
      description: "Mantén el valor de tus activos con nuestra stablecoin nativa, respaldada por un sistema descentralizado."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  return (
    <section className="py-24 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">Características Avanzadas</h2>
          <p className="text-gray-600 text-lg">
            Explora nuestras soluciones DeFi diseñadas para maximizar tus oportunidades financieras
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="h-full border-none overflow-hidden relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredCard === index ? 1 : 0,
                    transition: { duration: 0.3 } 
                  }}
                />

                {hoveredCard === index && (
                  <>
                    <motion.div 
                      className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-blue-200/20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                      className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-blue-200/30"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                  </>
                )}
                
                <CardHeader className="text-center pt-8 z-10 relative">
                  <motion.div
                    className="mx-auto mb-4"
                    animate={{ 
                      scale: hoveredCard === index ? 1.1 : 1,
                      y: hoveredCard === index ? -5 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8 z-10 relative">
                  <p className="text-gray-600">{feature.description}</p>
                  
                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredCard === index ? 1 : 0,
                      height: hoveredCard === index ? 'auto' : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <button className="text-blue-500 font-medium hover:text-blue-600 transition-colors">
                      Saber más →
                    </button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}