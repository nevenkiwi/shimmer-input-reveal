import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
interface AnimatedInputProps {
  onSubmit?: (value: string) => void;
  className?: string;
}
const placeholders = ["Try asking... How to request a refund for your flight?", "Try asking... How to change your travel ID number?", "Try asking... How to check-in online with the airline?", "Try asking... How to request special assistance?"];
const AnimatedInput: React.FC<AnimatedInputProps> = ({
  onSubmit,
  className
}) => {
  const [inputValue, setInputValue] = useState("");
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [showGradientBorder, setShowGradientBorder] = useState(true);
  const [isChangingPlaceholder, setIsChangingPlaceholder] = useState(false);

  // Fade away gradient border after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGradientBorder(false);
    }, 5000); // Extended to 5 seconds to give more time to see the flowing animation

    return () => clearTimeout(timer);
  }, []);

  // Rotate through placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setIsChangingPlaceholder(true);

      // Wait for fade out to complete
      setTimeout(() => {
        setCurrentPlaceholder(prev => (prev + 1) % placeholders.length);
        setIsChangingPlaceholder(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && onSubmit) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };
  return <form onSubmit={handleSubmit} className={cn("relative w-full max-w-2xl transition-all duration-500", className)}>
      <div className={cn("absolute inset-0 rounded-full transition-opacity duration-1000 opacity-0 overflow-hidden", showGradientBorder && "opacity-100")}>
        <div className="absolute inset-0 animate-liquid-flow bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 to-violet-500 to-pink-500" />
      </div>
      <div className="absolute inset-[2px] bg-white dark:bg-black rounded-full" />
      <div className="relative flex items-center rounded-full">
        <div className="flex items-center justify-center w-10 h-10 pl-3">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} className={cn("flex-1 h-14 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 px-2", "placeholder:text-gray-500 dark:placeholder:text-gray-400", isChangingPlaceholder && "animate-fade-out")} placeholder={placeholders[currentPlaceholder]} />
        <button type="submit" className="flex items-center justify-center w-10 h-10 mr-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors" disabled={!inputValue.trim()}>
          <Send size={18} />
        </button>
      </div>
    </form>;
};
export default AnimatedInput;