"use client";

import { Play, RotateCcw, Eye, RefreshCw, Pencil, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

interface GameHeaderProps {
    onShuffle: () => void;
    onReset: () => void;
    isRevealMode: boolean;
    toggleRevealMode: () => void;
    isInitialized: boolean;
    title: string;
    onTitleChange: (newTitle: string) => void;
}

export function GameHeader({ onShuffle, onReset, isRevealMode, toggleRevealMode, isInitialized, title, onTitleChange }: GameHeaderProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (tempTitle.trim()) {
            onTitleChange(tempTitle);
        } else {
            setTempTitle(title); // Revert if empty
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempTitle(title);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') handleCancel();
    };

    return (
        <header className="w-full h-24 px-6 flex items-center justify-between metallic-surface relative z-20">
            {/* Logo area with Editable Title */}
            <div className="flex items-center gap-4 group/title">
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={tempTitle}
                            onChange={(e) => setTempTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="text-3xl md:text-5xl font-black italic font-russo bg-black/50 text-[#fbbf24] border-b-2 border-[#fbbf24] focus:outline-none px-2 py-1 rounded w-[400px]"
                        />
                        <button onClick={handleSave} className="p-2 bg-green-600 rounded hover:bg-green-500 text-white"><Check size={20} /></button>
                        <button onClick={handleCancel} className="p-2 bg-red-600 rounded hover:bg-red-500 text-white"><X size={20} /></button>
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl md:text-5xl font-black italic font-russo text-[#fbbf24] drop-shadow-[0_4px_0_rgba(0,0,0,1)] tracking-wide filter transform skew-x-[-10deg]"
                            style={{
                                textShadow: "0 4px 0 #000, -2px -2px 0 #1e3a8a, 2px -2px 0 #1e3a8a, -2px 2px 0 #1e3a8a, 2px 2px 0 #1e3a8a",
                                WebkitTextStroke: "2px #1e3a8a"
                            }}>
                            {title}
                        </h1>
                        <button
                            onClick={() => {
                                setTempTitle(title);
                                setIsEditing(true);
                            }}
                            className="opacity-0 group-hover/title:opacity-100 transition-opacity p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full"
                            title="Edit Title"
                        >
                            <Pencil size={20} />
                        </button>
                    </>
                )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">

                {/* Shuffle Button */}
                <button
                    onClick={onShuffle}
                    className="group relative px-6 py-2 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-800 rounded-lg border-2 border-blue-400/50 shadow-[0_4px_0_rgb(30,58,138),0_0_10px_rgba(37,99,235,0.3)] active:shadow-[0_2px_0_rgb(30,58,138)] active:translate-y-[2px] transition-all hover:brightness-110"
                >
                    <div className="flex items-center gap-2 font-bold text-white text-shadow-sm">
                        {isInitialized ? <RefreshCw size={18} className={isInitialized ? "group-hover:rotate-180 transition-transform duration-500" : ""} /> : <Play size={18} />}
                        <span>{isInitialized ? "Shuffle" : "Start"}</span>
                    </div>
                </button>

                {/* Reset Round Button */}
                <button
                    onClick={onReset}
                    className="relative px-6 py-2 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-900 rounded-lg border-2 border-slate-500/50 shadow-[0_4px_0_rgb(15,23,42),0_0_10px_rgba(15,23,42,0.5)] active:shadow-[0_2px_0_rgb(15,23,42)] active:translate-y-[2px] transition-all hover:brightness-110"
                >
                    <div className="flex items-center gap-2 font-bold text-white text-shadow-sm">
                        <RotateCcw size={18} />
                        <span>Reset Round</span>
                    </div>
                </button>

                {/* Reveal Mode Toggle (Visual Only for now as requested by UI) */}
                <div className="flex items-center bg-black/60 rounded-lg overflow-hidden border-2 border-slate-600 ml-2 shadow-inner">
                    <div className="px-3 py-1.5 text-xs font-bold text-gray-300 uppercase tracking-wider bg-gradient-to-b from-slate-700 to-slate-800 border-r border-slate-600">
                        Reveal Mode
                    </div>
                    <button
                        onClick={toggleRevealMode}
                        className={cn(
                            "px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 min-w-[50px] text-center shadow-inner",
                            isRevealMode
                                ? "bg-gradient-to-b from-green-500 to-green-700 text-white text-shadow-sm"
                                : "bg-gradient-to-b from-slate-700 to-slate-900 text-gray-500"
                        )}>
                        {isRevealMode ? "ON" : "OFF"}
                    </button>
                </div>
            </div>
        </header>
    );
}
