import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage, DiaryEntry, AnalysisResult } from './types';
import { useKnowledgeBase } from './hooks/useKnowledgeBase';
import { analyzeSymptoms } from './services/geminiService';
import { SendIcon, UserIcon, BotIcon, BrainIcon } from './components/icons';
import { Disclaimer } from './components/Disclaimer';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { SymptomDiary } from './components/SymptomDiary';

const App: React.FC = () => {
    const { kb, loading: kbLoading, error: kbError } = useKnowledgeBase();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
    const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const messageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        const storedEntries = localStorage.getItem('symptomDiary');
        if (storedEntries) {
            setDiaryEntries(JSON.parse(storedEntries));
        }
        // Set a default welcome message
        setMessages([
          { id: 'welcome', role: 'assistant', content: "Bienvenido. Por favor, describe tus síntomas para comenzar el análisis. Por ejemplo: \"Tengo un temblor en la mano izquierda y me cuesta caminar.\""}
        ]);

    }, []);

    const handleLogSymptoms = useCallback((symptoms: string[]) => {
        const newEntry: DiaryEntry = {
            date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
            symptoms: symptoms,
            symptomCount: symptoms.length
        };
        setDiaryEntries(prevEntries => {
            const updatedEntries = [...prevEntries, newEntry];
            localStorage.setItem('symptomDiary', JSON.stringify(updatedEntries));
            return updatedEntries;
        });
    }, []);


    const handleSend = async () => {
        if (input.trim() === '' || isLoading || !kb) return;

        const newUserMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);
        setMessages(prev => [...prev, { id: 'loading', role: 'loading' }]);

        const analysisResult = await analyzeSymptoms(input, kb);
        setLastAnalysis(analysisResult);

        const newAssistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            analysis: analysisResult,
        };
        
        setMessages(prev => prev.filter(m => m.id !== 'loading'));
        setMessages(prev => [...prev, newAssistantMessage]);
        setIsLoading(false);
    };

    if (showDisclaimer) {
        return <Disclaimer onAccept={() => setShowDisclaimer(false)} />;
    }

    if (kbLoading) {
        return (
            <motion.div
                className="flex items-center justify-center h-screen bg-gray-900 text-xl font-semibold text-slate-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Cargando base de conocimiento...
            </motion.div>
        );
    }

    if (kbError) {
        return (
            <motion.div
                className="flex items-center justify-center h-screen bg-gray-900 text-xl font-semibold text-red-400"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                Error al cargar datos: {kbError.message}
            </motion.div>
        );
    }

    return (
        <motion.div
            className="h-screen w-screen flex flex-col md:flex-row bg-gray-900 font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <main className="flex-1 flex flex-col h-full max-h-screen">
                <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 p-4 flex items-center justify-center shadow-lg z-10">
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                    >
                        <BrainIcon className="h-8 w-8 text-teal-400 mr-3" />
                    </motion.div>
                    <motion.h1
                        className="text-2xl font-bold text-slate-100 tracking-wide"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Parkin-Chat AI
                    </motion.h1>
                </header>
                
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8">
                    <AnimatePresence>
                        {messages.map(msg => {
                            if(msg.role === 'loading') {
                                return (
                                    <motion.div
                                        key={msg.id}
                                        className="flex items-start space-x-4"
                                        initial="hidden"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        exit="exit"
                                        variants={messageVariants}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                            <BotIcon className="h-6 w-6 text-teal-500" />
                                        </div>
                                        <div className="bg-gray-800 rounded-xl p-4 w-56">
                                            <div className="h-3 bg-gray-700 rounded w-48 mb-2"></div>
                                            <div className="h-3 bg-gray-700 rounded w-32"></div>
                                        </div>
                                    </motion.div>
                                )
                            }
                            if(msg.role === 'user') {
                                return (
                                    <motion.div
                                        key={msg.id}
                                        className="flex justify-end items-start space-x-4 group"
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={messageVariants}
                                        transition={{ duration: 0.3 }}
                                    >
                                          <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-xl p-4 max-w-lg shadow-lg">
                                             <p>{msg.content}</p>
                                         </div>
                                         <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                             <UserIcon className="h-6 w-6 text-slate-300" />
                                         </div>
                                     </motion.div>
                                )
                            }
                            if(msg.role === 'assistant') {
                                  return (
                                     <motion.div
                                         key={msg.id}
                                         className="flex items-start space-x-4"
                                         initial="hidden"
                                         animate="visible"
                                         exit="exit"
                                         variants={messageVariants}
                                         transition={{ duration: 0.3 }}
                                     >
                                         <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                                             <BotIcon className="h-6 w-6 text-teal-400" />
                                         </div>
                                         <div className="flex-1 max-w-3xl">
                                           {msg.analysis ? (
                                             <AnalysisDisplay analysis={msg.analysis} />
                                           ) : (
                                             <div className="bg-gray-800 rounded-xl p-4 max-w-lg shadow-md">
                                               <p>{msg.content}</p>
                                             </div>
                                           )}
                                         </div>
                                     </motion.div>
                                 )
                            }
                            return null;
                        })}
                    </AnimatePresence>
                      <div ref={messagesEndRef} />
                </div>

                <div className="bg-gray-900/60 backdrop-blur-sm border-t border-gray-700/50 p-4 z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            className="flex items-center space-x-2 bg-gray-800 rounded-full p-2 border border-gray-700 focus-within:border-teal-500 transition-all duration-300 shadow-inner"
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <textarea
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => {if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                                placeholder="Describe tus síntomas aquí..."
                                rows={1}
                                className="flex-1 bg-transparent px-4 py-2 outline-none resize-none placeholder-gray-500 text-slate-200"
                                disabled={isLoading}
                            />
                            <motion.button
                                onClick={handleSend}
                                disabled={isLoading || input.trim() === ''}
                                className="p-3 rounded-full bg-teal-600 text-white hover:bg-teal-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-teal-900/50 disabled:shadow-none"
                                aria-label="Enviar mensaje"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <SendIcon className="h-6 w-6" />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </main>
            <motion.aside
                className="w-full md:w-96 lg:w-[450px] bg-gray-950/80 border-l border-gray-700/50 p-4 overflow-y-auto h-full shadow-2xl"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <SymptomDiary
                    entries={diaryEntries}
                    onLogSymptoms={handleLogSymptoms}
                    lastDetectedSymptoms={lastAnalysis?.detectedSymptoms.map(s => s.name) || []}
                />
            </motion.aside>
        </motion.div>
    );
};

export default App;