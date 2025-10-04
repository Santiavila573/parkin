import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisResult, PhaseName } from '../types';
import { AlertIcon, DietIcon, ExerciseIcon, SleepIcon, TherapyIcon } from './icons';

interface AnalysisDisplayProps {
  analysis: AnalysisResult;
}

const PhaseBadge: React.FC<{ phase: PhaseName }> = ({ phase }) => {
  const phaseStyles: Record<PhaseName, string> = {
    prodromica: 'bg-green-500/10 text-green-300 border border-green-500/30',
    temprana: 'bg-teal-500/10 text-teal-300 border border-teal-500/30',
    intermedia: 'bg-amber-500/10 text-amber-300 border border-amber-500/30',
    avanzada: 'bg-red-500/10 text-red-300 border border-red-500/30',
    desconocida: 'bg-gray-500/10 text-gray-300 border border-gray-500/30',
  };
  const phaseText: Record<PhaseName, string> = {
    prodromica: 'Prodrómica',
    temprana: 'Temprana',
    intermedia: 'Intermedia',
    avanzada: 'Avanzada',
    desconocida: 'Desconocida',
  };

  return (
    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${phaseStyles[phase]}`}>
      {phaseText[phase]}
    </span>
  );
};

const RecommendationCard: React.FC<{ title: string; text: string; icon: React.ReactNode; onClick: () => void }> = ({ title, text, icon, onClick }) => (
    <motion.div
        className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:bg-gray-800/80 transition-all duration-300 shadow-lg cursor-pointer"
        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
    >
        <div className="flex items-center mb-3">
            <motion.div
                className="p-2 bg-gray-700/50 rounded-full"
                whileHover={{ rotate: 10 }}
            >
              {icon}
            </motion.div>
            <h4 className="font-bold text-slate-100 ml-3 text-lg">{title}</h4>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
    </motion.div>
);

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; card: { title: string; text: string; icon: React.ReactNode } | null }> = ({ isOpen, onClose, card }) => (
  <AnimatePresence>
    {isOpen && card && (
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-700"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-100">{card.title}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="flex items-start mb-4">
            <div className="p-3 bg-gray-700/50 rounded-full mr-4 flex-shrink-0">
              {card.icon}
            </div>
            <p className="text-slate-300 leading-relaxed">{card.text}</p>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<{ title: string; text: string; icon: React.ReactNode } | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {analysis.medicalAlert && (
        <motion.div
          className="bg-gradient-to-r from-red-500/20 to-gray-900/10 border-l-4 border-red-500 text-red-200 p-4 rounded-r-lg shadow-2xl"
          role="alert"
          variants={itemVariants}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center">
            <AlertIcon className="h-8 w-8 text-red-400 mr-4" />
            <div>
              <p className="font-bold text-lg">Alerta Médica Urgente</p>
              <p className="text-sm">{analysis.alertReason} Se recomienda consultar con un neurólogo de inmediato.</p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        className="bg-gray-800/50 p-5 rounded-xl shadow-2xl border border-gray-700/80 backdrop-blur-sm"
        variants={itemVariants}
      >
        <h3 className="text-xl font-bold text-slate-100 mb-4">Resumen del Análisis</h3>
        <div className="flex items-center space-x-4 mb-4">
            <span className="font-semibold text-slate-300">Fase Estimada:</span>
            <PhaseBadge phase={analysis.estimatedPhase} />
        </div>
        <div>
            <h4 className="font-semibold text-slate-300 mb-2">Síntomas Detectados:</h4>
            {analysis.detectedSymptoms.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                {analysis.detectedSymptoms.map((s, i) => (
                    <motion.div
                      key={i}
                      className="bg-gray-700/80 text-slate-200 text-sm font-medium px-3 py-1 rounded-full flex items-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                    >
                        {s.name} <span className="ml-2 text-xs opacity-60 capitalize">({s.severity})</span>
                    </motion.div>
                ))}
                </div>
            ) : (
                <p className="text-slate-400 text-sm italic">No se detectaron síntomas específicos de la base de conocimiento.</p>
            )}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold text-slate-100 mb-4 ml-1">Recomendaciones Holísticas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RecommendationCard
              title="Dieta"
              text={analysis.recommendations.dieta}
              icon={<DietIcon className="h-6 w-6 text-teal-400"/>}
              onClick={() => { setSelectedCard({ title: "Dieta", text: analysis.recommendations.dieta, icon: <DietIcon className="h-8 w-8 text-teal-400"/> }); setIsModalOpen(true); }}
            />
            <RecommendationCard
              title="Ejercicio"
              text={analysis.recommendations.ejercicio}
              icon={<ExerciseIcon className="h-6 w-6 text-teal-400"/>}
              onClick={() => { setSelectedCard({ title: "Ejercicio", text: analysis.recommendations.ejercicio, icon: <ExerciseIcon className="h-8 w-8 text-teal-400"/> }); setIsModalOpen(true); }}
            />
            <RecommendationCard
              title="Sueño"
              text={analysis.recommendations.sueno}
              icon={<SleepIcon className="h-6 w-6 text-teal-400"/>}
              onClick={() => { setSelectedCard({ title: "Sueño", text: analysis.recommendations.sueno, icon: <SleepIcon className="h-8 w-8 text-teal-400"/> }); setIsModalOpen(true); }}
            />
            <RecommendationCard
              title="Terapias"
              text={analysis.recommendations.terapias_complementarias}
              icon={<TherapyIcon className="h-6 w-6 text-teal-400"/>}
              onClick={() => { setSelectedCard({ title: "Terapias", text: analysis.recommendations.terapias_complementarias, icon: <TherapyIcon className="h-8 w-8 text-teal-400"/> }); setIsModalOpen(true); }}
            />
        </div>
      </motion.div>

      {analysis.followUpQuestions.length > 0 && (
        <motion.div
          className="bg-purple-900/20 p-5 rounded-xl border border-purple-800/50 backdrop-blur-sm"
          variants={itemVariants}
        >
            <h3 className="text-lg font-bold text-purple-300 mb-3">Preguntas de Seguimiento</h3>
            <ul className="space-y-2 list-disc list-inside text-purple-300/80">
                {analysis.followUpQuestions.map((q, i) => (
                    <li key={i} className="text-sm">{q}</li>
                ))}
            </ul>
        </motion.div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} card={selectedCard} />
    </motion.div>
  );
};