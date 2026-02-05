import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Save, Check, Upload } from "lucide-react";
import { useState, useRef } from "react";

export type BackgroundOption = 'default' | 'midnight' | 'royal' | 'forest' | 'custom';

interface ConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    config: {
        totalPacks: number;
        totalChases: number;
        background: BackgroundOption;
        customBackgroundImage?: string | null;
    };
    onSave: (newConfig: { totalPacks: number; totalChases: number; background: BackgroundOption; customBackgroundImage?: string | null }) => void;
}

const BACKGROUNDS: { id: BackgroundOption; name: string; gradient: string }[] = [
    { id: 'default', name: 'Cosmic Space', gradient: 'linear-gradient(to right, #0b1026, #2b32b2)' },
    { id: 'midnight', name: 'Midnight', gradient: 'linear-gradient(to right, #000000, #0f172a)' },
    { id: 'royal', name: 'Royal Purple', gradient: 'linear-gradient(to right, #240046, #3c096c)' },
    { id: 'forest', name: 'Dark Forest', gradient: 'linear-gradient(to right, #00230e, #004d1a)' },
];

export function ConfigModal({ isOpen, onClose, config, onSave }: ConfigModalProps) {
    const [localConfig, setLocalConfig] = useState(config);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        onSave(localConfig);
        onClose();
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setLocalConfig({
                    ...localConfig,
                    background: 'custom',
                    customBackgroundImage: base64String
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
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
                            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
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

                                {/* Background Selection */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                        Background Theme
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {BACKGROUNDS.map((bg) => (
                                            <button
                                                key={bg.id}
                                                onClick={() => setLocalConfig({ ...localConfig, background: bg.id })}
                                                className={`relative h-20 rounded-lg border-2 overflow-hidden transition-all ${
                                                    localConfig.background === bg.id
                                                        ? 'border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] scale-105 z-10'
                                                        : 'border-slate-700 hover:border-slate-500 opacity-80 hover:opacity-100'
                                                }`}
                                                style={{ background: bg.gradient }}
                                            >
                                                <span className="absolute inset-0 flex items-center justify-center font-bold text-sm text-white drop-shadow-md z-10 px-2 text-center leading-tight">
                                                    {bg.name}
                                                </span>
                                                {localConfig.background === bg.id && (
                                                    <div className="absolute top-1 right-1 bg-cyan-500 rounded-full p-0.5 z-20">
                                                        <Check className="w-3 h-3 text-black" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}

                                        {/* Custom Option */}
                                        <button
                                            onClick={() => {
                                                if (localConfig.customBackgroundImage) {
                                                    setLocalConfig({ ...localConfig, background: 'custom' });
                                                } else {
                                                    triggerFileInput();
                                                }
                                            }}
                                            className={`relative h-20 rounded-lg border-2 border-dashed overflow-hidden transition-all flex flex-col items-center justify-center gap-1 group ${
                                                localConfig.background === 'custom'
                                                    ? 'border-cyan-400 bg-slate-800 shadow-[0_0_10px_rgba(34,211,238,0.5)] scale-105 z-10'
                                                    : 'border-slate-600 bg-slate-800/50 hover:border-slate-400 hover:bg-slate-800'
                                            }`}
                                        >
                                            {localConfig.customBackgroundImage ? (
                                                <>
                                                    <div 
                                                        className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity"
                                                        style={{ backgroundImage: `url(${localConfig.customBackgroundImage})` }}
                                                    />
                                                    <span className="relative z-10 font-bold text-sm text-white drop-shadow-md">Custom Image</span>
                                                    <div 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            triggerFileInput();
                                                        }}
                                                        className="relative z-10 p-1 bg-black/50 rounded-full hover:bg-cyan-600 transition-colors pointer-events-auto"
                                                        title="Change Image"
                                                    >
                                                        <Upload className="w-4 h-4 text-white" />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                                    <span className="text-xs font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">Upload Custom</span>
                                                </>
                                            )}

                                            {localConfig.background === 'custom' && (
                                                <div className="absolute top-1 right-1 bg-cyan-500 rounded-full p-0.5 z-20">
                                                    <Check className="w-3 h-3 text-black" />
                                                </div>
                                            )}
                                        </button>
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            className="hidden" 
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-slate-900 pb-2">
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
