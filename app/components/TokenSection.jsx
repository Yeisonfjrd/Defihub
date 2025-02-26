"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import TokenModel3D from "./TokenModel3D";

export default function TokenSection() {
  const [isModelMode, setIsModelMode] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 relative">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-blue-400">DeFiHub Token</span>
              <br />El combustible de nuestro ecosistema
            </h2>
            <p className="text-slate-300 mb-8">
              Nuestro token nativo DHB proporciona utilidades esenciales dentro de la plataforma, 
              desde gobernanza hasta beneficios exclusivos para los holders, garantizando que todos 
              los participantes del ecosistema obtengan valor real.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Gobernanza participativa en todas las decisiones del protocolo",
                "Staking con altos rendimientos y recompensas semanales",
                "Acceso prioritario a nuevas características y productos financieros",
                "Descuentos en fees de transacción y servicios premium",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-blue-400 text-xl">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.div className="flex flex-wrap gap-4 mt-8">
            <motion.button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              onClick={() => window.open('https://exchange.pancakeswap.finance', '_blank')}
              onMouseEnter={() => playHover()}
              onMouseDown={() => playClick()}
            >
              Adquirir token DHB
            </motion.button>
            <motion.button
              className="border border-blue-400 text-blue-400 hover:bg-blue-800/30 px-6 py-3 rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              onClick={() => window.location.href = '/tokenomics'}
              onMouseEnter={() => playHover()}
              onMouseDown={() => playClick()}
            >
              Tokenomics
            </motion.button>
            </motion.div>
          </motion.div>
          <motion.div
            className="order-1 md:order-2"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <TokenModel3D />
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { label: "Market Cap", value: "$24.5M", icon: "📈" },
            { label: "Holders", value: "12,450+", icon: "👥" },
            { label: "Total Locked", value: "68.2M DHB", icon: "🔒" },
            { label: "Network Growth", value: "+32% MoM", icon: "📊" },
          ].map((metric, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-4 bg-slate-800 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className="text-xl font-bold">{metric.value}</div>
              <div className="text-sm text-slate-400">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
