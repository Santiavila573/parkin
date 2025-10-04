import React from 'react';
import { motion } from 'framer-motion';
import { AlertIcon } from './icons';

interface DisclaimerProps {
  onAccept: () => void;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ onAccept }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-gray-800/50 border border-gray-700 rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex flex-col items-center text-center">
           <motion.div
             className="p-3 bg-purple-900/30 rounded-full border border-purple-700 mb-4"
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
           >
             <AlertIcon className="h-10 w-10 text-purple-400" />
           </motion.div>
           <motion.h2
             className="text-2xl font-bold text-slate-100"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, duration: 0.5 }}
           >
             Aviso Importante
           </motion.h2>
        </div>
        <motion.p
          className="mt-4 text-center text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Este Asistente de Diagnóstico es una herramienta informativa y experimental, no un sustituto del consejo médico profesional.
        </motion.p>
        <motion.div
          className="mt-6 space-y-3 text-slate-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
            <p>✓ La información se basa en un modelo de IA y no debe considerarse un diagnóstico.</p>
            <p>✓ Un diagnóstico preciso solo puede ser realizado por un neurólogo cualificado.</p>
            <p>✓ Si experimenta síntomas graves, busque atención médica de inmediato.</p>
        </motion.div>
        <motion.p
          className="mt-6 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Al continuar, usted acepta que esta herramienta no proporciona consejo médico.
        </motion.p>
        <div className="mt-8 flex justify-center">
          <motion.button
            onClick={onAccept}
            className="px-8 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/50 transition-all duration-300 shadow-lg shadow-teal-900/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Entendido, continuar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};