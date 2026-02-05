"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, ChevronLeft, ChevronRight, Upload, Pencil } from "lucide-react";
import { ChaseItem } from "@/types/game";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

interface ChaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    chaseItems: ChaseItem[];
    onToggleChase: (id: string) => void;
    onUpdateImage: (id: string, imageUrl: string) => void;
}

export function ChaseModal({ isOpen, onClose, chaseItems, onToggleChase, onUpdateImage }: ChaseModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % chaseItems.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + chaseItems.length) % chaseItems.length);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && currentItem) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                onUpdateImage(currentItem.id, base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const currentItem = chaseItems[currentIndex];

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
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900/80 border border-cyan-500/50 rounded-2xl p-6 w-full max-w-4xl shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col items-center relative"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center w-full mb-6 border-b border-cyan-500/20 pb-4">
                                <h2 className="text-3xl font-russo text-cyan-400 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                                    <Trophy className="w-8 h-8 text-yellow-500" />
                                    Chase Gallery
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Carousel Container */}
                            <div className="relative w-full aspect-video max-h-[60vh] flex items-center justify-center bg-black/40 rounded-xl border border-white/5 overflow-hidden group">

                                {/* Previous Button */}
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 z-10 p-3 bg-black/50 hover:bg-cyan-600/80 text-white rounded-full transition-all hover:scale-110 border border-white/10 backdrop-blur-sm"
                                >
                                    <ChevronLeft size={32} />
                                </button>

                                {/* Main Content */}
                                <div className="w-full h-full flex flex-col items-center justify-center p-8">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentIndex}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex flex-col items-center gap-6"
                                        >
                                            {/* Image Placeholder */}
                                            <div
                                                className={cn(
                                                    "w-[200px] h-[300px] rounded-lg border-4 shadow-2xl flex items-center justify-center relative overflow-hidden transition-all group/card",
                                                    currentItem.isPulled
                                                        ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                                                        : "border-slate-700 bg-slate-800"
                                                )}
                                            >
                                                {/* Image Content */}
                                                {currentItem.imageUrl ? (
                                                    <img
                                                        src={currentItem.imageUrl}
                                                        alt={currentItem.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                                                        <span className="text-6xl font-black text-white/10 select-none">
                                                            {currentIndex + 1}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* "X" Overlay */}
                                                {currentItem.isPulled && (
                                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-20">
                                                        <X className="w-32 h-32 text-red-600 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] stroke-[3]" />
                                                    </div>
                                                )}

                                                {/* Edit/Upload Button */}
                                                <button
                                                    onClick={triggerFileInput}
                                                    className="absolute top-2 right-2 p-2 bg-black/60 text-white rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-blue-600 z-30"
                                                    title="Upload Image"
                                                >
                                                    <Pencil size={14} />
                                                </button>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="text-center">
                                                <h3 className="text-3xl font-bold text-white mb-2">{currentItem.name}</h3>
                                                <button
                                                    onClick={() => onToggleChase(currentItem.id)}
                                                    className={cn(
                                                        "px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all",
                                                        currentItem.isPulled
                                                            ? "bg-red-600/20 text-red-400 border border-red-600/50 hover:bg-red-600 hover:text-white"
                                                            : "bg-cyan-600/20 text-cyan-400 border border-cyan-600/50 hover:bg-cyan-600 hover:text-white"
                                                    )}
                                                >
                                                    {currentItem.isPulled ? "Mark as Missing" : "Mark as Found"}
                                                </button>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 z-10 p-3 bg-black/50 hover:bg-cyan-600/80 text-white rounded-full transition-all hover:scale-110 border border-white/10 backdrop-blur-sm"
                                >
                                    <ChevronRight size={32} />
                                </button>

                                {/* Indicators */}
                                <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2">
                                    {chaseItems.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentIndex(idx)}
                                            className={cn(
                                                "w-2 h-2 rounded-full transition-all",
                                                idx === currentIndex ? "bg-cyan-400 w-6" : "bg-white/20 hover:bg-white/40"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
