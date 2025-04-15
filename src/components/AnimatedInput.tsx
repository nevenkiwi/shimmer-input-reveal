
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

interface AnimatedInputProps {
  onSubmit?: (value: string) => void;
  className?: string;
}

const placeholderPrefixText = "Try asking...";
const placeholderTexts = [
  "How to request a refund for your flight?",
  "How to change your travel ID number?",
  "How to check-in online with the airline?",
  "How to request special assistance?"
];

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  onSubmit,
  className
}) => {
  const [inputValue, setInputValue] = useState("");
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showGradientBorder, setShowGradientBorder] = useState(true);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fade away gradient border after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGradientBorder(false);
    }, 5000); // Extended to 5 seconds to give more time to see the flowing animation

    return () => clearTimeout(timer);
  }, []);

  // Typewriter animation effect
  useEffect(() => {
    const currentText = placeholderTexts[currentPlaceholderIndex];
    
    if (isTyping) {
      if (displayText.length < currentText.length) {
        // Typing phase - add one character at a time (reduced from 100 to 50ms)
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }, 50);
      } else {
        // Finished typing - pause before starting to erase (reduced from 2000 to 1000ms)
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
      }
    } else {
      if (displayText.length > 0) {
        // Erasing phase - remove one character at a time (reduced from 50 to 25ms)
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 25);
      } else {
        // Finished erasing - move to next text and start typing again
        setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
        setIsTyping(true);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, isTyping, currentPlaceholderIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && onSubmit) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full max-w-2xl transition-all duration-500 rounded-full overflow-hidden", className)}>
      {/* Glowing border animation container */}
      <div className={cn(
        "absolute inset-0 rounded-full transition-opacity duration-1000 opacity-0", 
        showGradientBorder && "opacity-100"
      )}>
        {/* Outer glow wrapper */}
        <div className="absolute -inset-2 rounded-full blur-md bg-gradient-to-r from-[#E978F3] to-[#83F0E0] animate-liquid-flow opacity-70" />
        
        {/* Inner gradient border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E978F3] to-[#83F0E0] animate-liquid-flow" />
      </div>
      
      {/* Inner content background */}
      <div className="absolute inset-[2px] bg-white dark:bg-black rounded-full" />
      
      {/* Input and button container */}
      <div className="relative flex items-center rounded-full">
        <div className="flex items-center justify-center w-10 h-10 pl-3">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <input 
          type="text" 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)} 
          className="flex-1 h-14 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 px-2 placeholder:text-gray-500 dark:placeholder:text-gray-400" 
          placeholder={`${placeholderPrefixText} ${displayText}`} 
        />
        <button 
          type="submit" 
          className="flex items-center justify-center w-10 h-10 mr-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors" 
          disabled={!inputValue.trim()}
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};

export default AnimatedInput;
