import Image from "next/image";

export function SpiritualImage({ 
  src, 
  alt, 
  className = "" 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* Background Pattern Layer */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(61, 0, 80, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(212, 160, 23, 0.3) 0%, transparent 50%),
                repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.02) 10px, rgba(255, 255, 255, 0.02) 20px),
                repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212, 160, 23, 0.05) 10px, rgba(212, 160, 23, 0.05) 20px)
              `
            }}
          ></div>
        </div>
        
        {/* Cross Pattern Overlay */}
        <div className="absolute inset-0 opacity-15">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="crosses" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M25 15 L25 45 M15 25 L45 25" stroke="#d4a017" strokeWidth="1" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#crosses)" />
          </svg>
        </div>
        
        {/* Divine Light Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/70"></div>
        
        {/* Additional Spiritual Patterns */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(212, 160, 23, 0.1) 0%, transparent 70%),
                conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(61, 0, 80, 0.1) 90deg, transparent 180deg, rgba(212, 160, 23, 0.1) 270deg, transparent 360deg)
              `
            }}
          ></div>
        </div>
      </div>
      
      {/* Main Image */}
      <div className="relative z-10 p-8">
        <div className="relative mx-auto max-w-md">
          {/* Glow Effect Behind Image */}
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-gold/20 via-royal-purple/10 to-transparent blur-xl"></div>
          
          {/* Image Container */}
          <div className="relative rounded-2xl border-4 border-gold/30 shadow-strong">
            <Image
              src={src}
              alt={alt}
              width={400}
              height={400}
              className="rounded-xl"
              style={{
                filter: `
                  drop-shadow(0 0 30px rgba(212, 160, 23, 0.5))
                  drop-shadow(0 0 60px rgba(61, 0, 80, 0.3))
                  contrast(1.2)
                  brightness(1.1)
                  saturate(1.1)
                `
              }}
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            
            {/* Divine Glow Overlay */}
            <div className="absolute inset-0 rounded-xl bg-gradient-radial from-transparent via-gold/10 to-transparent"></div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full border-2 border-gold opacity-60"></div>
          <div className="absolute -bottom-4 -right-4 h-12 w-12 rounded-full border-2 border-burgundy opacity-60"></div>
          <div className="absolute top-1/2 -left-8 h-6 w-6 rounded-full border-2 border-royal-purple opacity-40"></div>
          <div className="absolute top-1/3 -right-6 h-4 w-4 rounded-full border-2 border-gold opacity-50"></div>
        </div>
      </div>
      
      {/* Corner Ornaments */}
      <div className="absolute top-4 left-4 text-royal-purple/20">
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
      </div>
      <div className="absolute top-4 right-4 text-royal-purple/20">
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 text-royal-purple/20">
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
      </div>
      <div className="absolute bottom-4 right-4 text-royal-purple/20">
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
      </div>
    </div>
  );
}
