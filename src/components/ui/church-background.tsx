interface ChurchBackgroundProps {
  children: React.ReactNode;
  className?: string;
  opacity?: "light" | "medium" | "heavy";
}

export function ChurchBackground({ 
  children, 
  className = "", 
  opacity = "light" 
}: ChurchBackgroundProps) {
  const opacityClasses = {
    light: "from-royal-purple/5 to-burgundy/5",
    medium: "from-royal-purple/10 to-burgundy/10", 
    heavy: "from-royal-purple/20 to-burgundy/20"
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${opacityClasses[opacity]} flex items-center justify-center py-12 px-4 ${className}`}>
      {/* Additional pattern overlay for more texture */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(61, 0, 80, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(212, 160, 23, 0.1) 0%, transparent 50%),
              repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(61, 0, 80, 0.02) 20px, rgba(61, 0, 80, 0.02) 40px),
              repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(212, 160, 23, 0.02) 20px, rgba(212, 160, 23, 0.02) 40px)
            `
          }}
        ></div>
      </div>
      
      {/* Cross pattern overlay for church theme */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="churchCrosses" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M35 20 L35 60 M20 35 L60 35" stroke="#3d0050" strokeWidth="1" opacity="0.2"/>
              <path d="M55 20 L55 60 M40 35 L80 35" stroke="#d4a017" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#churchCrosses)" />
        </svg>
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

// Simplified version for just the background pattern
export function ChurchPattern({ 
  className = "", 
  opacity = "light" as const 
}: { 
  className?: string; 
  opacity?: "light" | "medium" | "heavy";
}) {
  const opacityClasses = {
    light: "from-royal-purple/5 to-burgundy/5",
    medium: "from-royal-purple/10 to-burgundy/10", 
    heavy: "from-royal-purple/20 to-burgundy/20"
  };

  return (
    <div className={`bg-gradient-to-br ${opacityClasses[opacity]} ${className}`}>
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(61, 0, 80, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(212, 160, 23, 0.1) 0%, transparent 50%),
              repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(61, 0, 80, 0.02) 20px, rgba(61, 0, 80, 0.02) 40px),
              repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(212, 160, 23, 0.02) 20px, rgba(212, 160, 23, 0.02) 40px)
            `
          }}
        ></div>
      </div>
      
      {/* Cross pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="churchCrosses" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M35 20 L35 60 M20 35 L60 35" stroke="#3d0050" strokeWidth="1" opacity="0.2"/>
              <path d="M55 20 L55 60 M40 35 L80 35" stroke="#d4a017" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#churchCrosses)" />
        </svg>
      </div>
    </div>
  );
}
