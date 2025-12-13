import { useEffect, useState } from "react";

interface PlantToggleProps {
  className?: string;
}

export function PlantToggle({ className = "" }: PlantToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-9 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${className}`}
      style={{
        background: isDark 
          ? 'linear-gradient(180deg, hsl(30, 30%, 18%) 0%, hsl(25, 35%, 12%) 100%)' 
          : 'linear-gradient(180deg, hsl(30, 40%, 65%) 0%, hsl(25, 45%, 50%) 100%)',
        boxShadow: isDark 
          ? 'inset 0 2px 8px hsl(0 0% 0% / 0.4), 0 0 20px hsl(145 70% 45% / 0.2)' 
          : 'inset 0 2px 6px hsl(25 40% 30% / 0.3)',
      }}
      aria-label="Toggle theme"
    >
      {/* Soil/pot texture lines */}
      <div className="absolute inset-x-2 bottom-1.5 h-0.5 rounded-full opacity-30"
        style={{ background: isDark ? 'hsl(30, 20%, 30%)' : 'hsl(30, 30%, 55%)' }}
      />
      <div className="absolute inset-x-3 bottom-2.5 h-0.5 rounded-full opacity-20"
        style={{ background: isDark ? 'hsl(30, 20%, 35%)' : 'hsl(30, 30%, 60%)' }}
      />

      {/* Leaf/sprout toggle thumb */}
      <div
        className={`absolute top-1 transition-all duration-300 ease-out ${
          isDark ? 'left-8' : 'left-1'
        }`}
      >
        <div 
          className={`relative ${isAnimating ? (isDark ? 'plant-grow' : 'plant-shrink') : ''}`}
        >
          {/* Main leaf/sprout */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            className="drop-shadow-lg"
          >
            {/* Stem */}
            <path
              d="M14 22 C14 18, 14 14, 14 12"
              stroke={isDark ? 'hsl(145, 65%, 35%)' : 'hsl(145, 40%, 40%)'}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            
            {/* Left leaf */}
            <path
              d={isDark 
                ? "M14 14 C10 12, 6 10, 5 6 C8 7, 12 10, 14 14" 
                : "M14 16 C12 15, 10 14, 9 12 C11 12, 13 14, 14 16"
              }
              fill={isDark ? 'hsl(145, 70%, 45%)' : 'hsl(145, 50%, 45%)'}
              className="transition-all duration-300"
              style={{
                filter: isDark ? 'drop-shadow(0 0 6px hsl(145, 70%, 45%))' : 'none',
              }}
            />
            
            {/* Right leaf */}
            <path
              d={isDark 
                ? "M14 12 C18 10, 22 8, 23 4 C20 5, 16 9, 14 12" 
                : "M14 15 C16 14, 18 13, 19 11 C17 11, 15 13, 14 15"
              }
              fill={isDark ? 'hsl(85, 75%, 55%)' : 'hsl(145, 45%, 50%)'}
              className="transition-all duration-300"
              style={{
                filter: isDark ? 'drop-shadow(0 0 8px hsl(85, 75%, 55%))' : 'none',
              }}
            />

            {/* Center bud/tip (only in dark mode) */}
            {isDark && (
              <circle
                cx="14"
                cy="8"
                r="2.5"
                fill="hsl(145, 75%, 50%)"
                className="glow-pulse"
                style={{
                  filter: 'drop-shadow(0 0 8px hsl(145, 75%, 50%))',
                }}
              />
            )}
          </svg>

          {/* Glow effect for dark mode */}
          {isDark && (
            <div 
              className="absolute inset-0 rounded-full opacity-50 blur-md"
              style={{
                background: 'radial-gradient(circle, hsl(145, 70%, 50%) 0%, transparent 70%)',
              }}
            />
          )}
        </div>
      </div>

      {/* Moon/sun indicators */}
      <div className={`absolute top-2.5 left-2.5 w-3 h-3 rounded-full transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-60'}`}>
        <div className="w-full h-full rounded-full bg-yellow-400" style={{ boxShadow: '0 0 8px hsl(45, 90%, 55%)' }} />
      </div>
      <div className={`absolute top-2.5 right-2.5 w-3 h-3 rounded-full transition-opacity duration-300 ${isDark ? 'opacity-60' : 'opacity-0'}`}>
        <div className="w-full h-full rounded-full bg-slate-200" style={{ boxShadow: '0 0 6px hsl(0, 0%, 80%)' }} />
      </div>
    </button>
  );
}
