"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Save } from "lucide-react";
import { useState } from "react";

interface ConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    config: {
        totalPacks: number;
        totalChases: number;
    };
    onSave: (newConfig: { totalPacks: number; totalChases: number }) => void;
}

export function ConfigModal({ isOpen, onClose, config, onSave }: ConfigModalProps) {
    const [localConfig, setLocalConfig] = useState(config);

    const handleSave = () => {
        onSave(localConfig);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
                        >
                            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Settings className="w-6 h-6 text-slate-400" />
                                    Game Configuration
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {/* Total Packs */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                        Total Bags (Packs)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="500"
                                        value={localConfig.totalPacks}
                                        onChange={(e) => setLocalConfig({ ...localConfig, totalPacks: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white font-mono focus:border-cyan-500 focus:outline-none transition-colors"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Number of balls/packs in the grid for each round.
                                    </p>
                                </div>

                                {/* Total Chases */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                        Total Chases
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={localConfig.totalChases}
                                        onChange={(e) => setLocalConfig({ ...localConfig, totalChases: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white font-mono focus:border-cyan-500 focus:outline-none transition-colors"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Number of chase prizes available to be found.
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 text-gray-400 hover:text-white font-bold transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-bold flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>

                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
