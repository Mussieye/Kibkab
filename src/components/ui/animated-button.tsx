"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  as?: "button" | "a" | "div";
}

export function AnimatedButton({
  children,
  onClick,
  href,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className,
  as: Component = href ? "a" : "button",
  ...props
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-royal-purple to-gold text-white hover:from-royal-purple/90 hover:to-gold/90 focus:ring-gold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary: "bg-white text-royal-purple border-2 border-royal-purple hover:bg-royal-purple hover:text-white focus:ring-royal-purple shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
    outline: "bg-transparent text-royal-purple border-2 border-royal-purple hover:bg-royal-purple hover:text-white focus:ring-royal-purple transform hover:-translate-y-0.5",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    isPressed && "transform scale-95",
    isHovered && !disabled && !loading && "transform -translate-y-1",
    className
  );

  const content = (
    <>
      <span className={cn("transition-opacity duration-200", loading && "opacity-0")}>
        {children}
      </span>
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
        </div>
      )}
      
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-lg overflow-hidden">
        <span 
          className={cn(
            "absolute inset-0 bg-white/20 transform scale-0 rounded-lg transition-transform duration-300 ease-out",
            isPressed && "scale-100"
          )}
        />
      </span>
    </>
  );

  const handleClick = () => {
    if (!disabled && !loading) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      onClick?.();
    }
  };

  if (Component === "a") {
    return (
      <a
        href={href}
        className={classes}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={handleClick}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Component
      className={classes}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </Component>
  );
}
