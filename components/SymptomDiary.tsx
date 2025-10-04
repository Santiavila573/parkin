import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DiaryEntry } from '../types';

interface SymptomDiaryProps {
    entries: DiaryEntry[];
    onLogSymptoms: (symptoms: string[]) => void;
    lastDetectedSymptoms: string[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 p-3 rounded-lg shadow-lg">
          <p className="label text-slate-200 font-bold">{`Fecha: ${label}`}</p>
          <p className="intro text-teal-400">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
};

export const SymptomDiary: React.FC<SymptomDiaryProps> = ({ entries, onLogSymptoms, lastDetectedSymptoms }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleLogClick = () => {
        if (lastDetectedSymptoms.length > 0) {
            onLogSymptoms(lastDetectedSymptoms);
        }
    };

    return (
        <motion.div
            className="bg-gradient-to-b from-gray-800/80 to-gray-900/50 rounded-xl shadow-2xl w-full transition-all duration-300 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.button
                className="w-full text-left p-4 font-bold text-lg text-slate-200 flex justify-between items-center"
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                transition={{ duration: 0.2 }}
            >
                Diario de Síntomas
                <motion.svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </motion.svg>
            </motion.button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="p-4 border-t border-gray-700/50"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-4">
                            <motion.button
                                onClick={handleLogClick}
                                disabled={lastDetectedSymptoms.length === 0}
                                className="w-full px-4 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-500 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-teal-900/30 disabled:shadow-none"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Registrar {lastDetectedSymptoms.length > 0 ? `${lastDetectedSymptoms.length} Síntoma(s)` : 'Síntomas'}
                            </motion.button>
                        </div>

                        <h3 className="font-semibold text-slate-300 mb-2">Progreso de Síntomas</h3>
                        {entries.length > 1 ? (
                            <motion.div
                                style={{ width: '100%', height: 300 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <ResponsiveContainer>
                                    <LineChart
                                        data={entries}
                                        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                                        <XAxis dataKey="date" stroke="#a0aec0" fontSize={12} />
                                        <YAxis allowDecimals={false} stroke="#a0aec0" fontSize={12} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend wrapperStyle={{ color: '#cbd5e1' }} />
                                        <Line type="monotone" dataKey="symptomCount" name="Nº de Síntomas" stroke="#4fd1c5" strokeWidth={2} dot={{ r: 4, fill: '#4fd1c5' }} activeDot={{ r: 8, stroke: '#4fd1c5', fill: '#1a202c' }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="text-center text-slate-400 p-8 border-2 border-dashed border-gray-700 rounded-lg"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                               <p>
                                {entries.length === 1 ? 'Se necesita al menos una entrada más para mostrar el gráfico.' : 'No hay entradas. Realiza un análisis y registra los síntomas para empezar.'}
                               </p>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};