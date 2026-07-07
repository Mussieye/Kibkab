import Link from "next/link";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  linkText: string;
  variant?: "default" | "featured";
}

export function FeatureCard({ 
  title, 
  description, 
  icon, 
  href, 
  linkText, 
  variant = "default" 
}: FeatureCardProps) {
  const baseClasses = "group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-strong";
  const variantClasses = variant === "featured" 
    ? "border-gold/30 bg-gradient-to-br from-royal-purple/5 to-burgundy/5 shadow-medium"
    : "border-royal-purple/15 bg-gradient-to-br from-white to-cream shadow-soft";

  return (
    <article className={baseClasses + " " + variantClasses}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="h-full w-full" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233d0050' fill-opacity='0.1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-royal-purple to-burgundy text-gold shadow-soft group-hover:shadow-glow transition-shadow">
          {icon}
        </div>
        
        {/* Content */}
        <h3 className="mb-4 font-serif text-2xl font-semibold text-royal-purple">
          {title}
        </h3>
        
        <p className="mb-6 text-charcoal/80 leading-relaxed">
          {description}
        </p>
        
        <Link 
          href={href}
          className="inline-flex items-center gap-2 font-semibold text-burgundy transition-colors group-hover:text-burgundy-light"
        >
          {linkText}
          <svg 
            className="h-4 w-4 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </Link>
      </div>
      
      {/* Hover Effect Border */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-royal-purple via-gold to-burgundy transform scale-x-0 transition-transform group-hover:scale-x-100"></div>
    </article>
  );
}
