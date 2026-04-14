import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StyledSelect = ({ options, value, onChange, placeholder, label, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options.find(opt => opt.label === value);

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest ml-1">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3.5 border transition-all duration-300 outline-none ${isOpen ? 'border-primary/30 ring-4 ring-primary/5 bg-white' : 'border-transparent hover:border-gray-200'}`}
      >
        {Icon && <Icon className={`w-5 h-5 transition-colors ${isOpen || value ? 'text-primary' : 'text-gray-400'}`} />}
        <span className={`text-sm font-bold flex-1 text-left ${value ? 'text-brand-on-surface' : 'text-gray-300'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-[100] top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-premium border border-gray-100 overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto py-2 no-scrollbar">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-5 py-3 cursor-pointer transition-colors ${value === option.value ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <span className="text-sm font-bold">{option.label}</span>
                  {value === option.value && <Check className="w-4 h-4" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StyledSelect;
