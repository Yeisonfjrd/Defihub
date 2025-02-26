"use client";

import { motion } from "framer-motion";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const links = [
    { category: "Productos", items: ["Préstamos", "Staking", "Stablecoin", "Gobernanza"] },
    { category: "Compañía", items: ["Acerca de", "Equipo", "Carreras", "Blog"] },
    { category: "Recursos", items: ["Documentación", "Tutoriales", "FAQs", "Auditorías"] },
    { category: "Legal", items: ["Términos", "Privacidad", "Cookies", "Seguridad"] }
  ];

  const socialLinks = [
    { icon: <GithubIcon size={18} />, href: "https://github.com/Yeisonfjrd" },
    { icon: <TwitterIcon size={18} />, href: "#" },
    { icon: <LinkedinIcon size={18} />, href: "https://www.linkedin.com/in/yeison-fajardo/" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-white text-xl font-bold">DeFiHub</span>
            </div>
            
            <p className="text-gray-400 max-w-md">
              Plataforma inmersiva de finanzas descentralizadas que 
              revoluciona la forma de interactuar con activos digitales, 
              ofreciendo experiencias únicas y soluciones innovadoras.
            </p>
            
            {/* Redes sociales */}
            <div className="flex mt-6 space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-white text-lg font-semibold mb-4">
              Mantente Actualizado
            </h3>
            
            <p className="text-gray-400 mb-4">
              Recibe las últimas noticias y actualizaciones sobre DeFiHub
            </p>
            
            <div className="flex">
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="bg-gray-800 border border-gray-700 text-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <motion.button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Suscribir
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="grid md:grid-cols-4 gap-8 py-8 border-t border-gray-800"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {links.map((column, columnIndex) => (
            <motion.div key={columnIndex} variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4">{column.category}</h4>
              <ul className="space-y-2">
                {column.items.map((item, itemIndex) => (
                  <motion.li key={itemIndex}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center pt-8 border-t border-gray-800 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p>© {currentYear} DeFiHub. Todos los derechos reservados.</p>

          <div className="flex justify-center mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={index}
                className="w-1.5 h-1.5 rounded-full bg-blue-500 mx-1"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.2,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}