"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

interface ButtonSystemProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "success" | "warning" | "danger" | "gradient";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  as?: "button" | "a" | "div";
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
}

export function ButtonSystem({
  children,
  onClick,
  href,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  rounded = "md",
  icon,
  iconPosition = "left",
  className = "",
  as: Component = "button",
  type = "button",
  target,
  rel,
  ...props
}: ButtonSystemProps) {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Base styles
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none overflow-hidden group";
  
  // Size styles
  const sizeStyles = {
    xs: "px-2 py-1 text-xs min-h-[24px]",
    sm: "px-3 py-1.5 text-sm min-h-[32px]",
    md: "px-4 py-2 text-sm min-h-[40px]",
    lg: "px-6 py-3 text-base min-h-[48px]",
    xl: "px-8 py-4 text-lg min-h-[56px]",
  };

  // Rounded styles
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  // Variant styles
  const variantStyles = {
    primary: "bg-gradient-to-r from-royal-purple to-gold text-white hover:from-royal-purple/90 hover:to-gold/90 focus:ring-gold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary: "bg-white text-royal-purple border-2 border-royal-purple hover:bg-royal-purple hover:text-white focus:ring-royal-purple shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
    outline: "bg-transparent text-royal-purple border-2 border-royal-purple hover:bg-royal-purple hover:text-white focus:ring-royal-purple transform hover:-translate-y-0.5",
    ghost: "bg-transparent text-royal-purple hover:bg-royal-purple/10 focus:ring-royal-purple",
    success: "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 focus:ring-green-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 focus:ring-yellow-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    danger: "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 focus:ring-red-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    gradient: "bg-gradient-to-r from-purple-600 via-pink-500 to-gold text-white hover:from-purple-700 hover:via-pink-600 hover:to-gold-600 focus:ring-gold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
  };

  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";

  // Combine all styles
  const buttonStyles = [
    baseStyles,
    sizeStyles[size],
    roundedStyles[rounded],
    variantStyles[variant],
    widthStyles,
    isPressed && "transform scale-95",
    isHovered && !disabled && !loading && "transform -translate-y-1",
    className
  ].filter(Boolean).join(" ");

  // Loading text based on language
  const getLoadingText = () => {
    switch (language) {
      case 'es': return 'Cargando...';
      case 'fr': return 'Chargement...';
      case 'nl': return 'Laden...';
      default: return 'Loading...';
    }
  };

  // Render button content
  const renderContent = () => (
    <>
      {/* Normal content */}
      <span className={cn(
        "flex items-center gap-2 transition-opacity duration-200",
        loading && "opacity-0"
      )}>
        {icon && iconPosition === "left" && (
          <span className="flex-shrink-0 transition-transform group-hover:scale-110">{icon}</span>
        )}
        <span className="truncate">{children}</span>
        {icon && iconPosition === "right" && (
          <span className="flex-shrink-0 transition-transform group-hover:scale-110">{icon}</span>
        )}
      </span>
      
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
            <span className="text-sm font-medium">{getLoadingText()}</span>
          </div>
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
      
      {/* Shine effect */}
      <span className="absolute inset-0 rounded-lg overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </span>
    </>
  );

  // Handle click
  const handleClick = () => {
    if (!disabled && !loading) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      onClick?.();
    }
  };

  // Common props
  const commonProps = {
    className: buttonStyles,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onClick: handleClick,
    disabled: disabled || loading,
    ...props
  };

  // Render as link
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={buttonStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={handleClick}
      >
        {renderContent()}
      </Link>
    );
  }

  // Render as button
  return (
    <Component
      type={type}
      {...commonProps}
    >
      {renderContent()}
    </Component>
  );
}

// Utility function for className merging
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Pre-styled button components for common use cases
export function PrimaryButton(props: Omit<ButtonSystemProps, 'variant'>) {
  return <ButtonSystem {...props} variant="primary" />;
}

export function SecondaryButton(props: Omit<ButtonSystemProps, 'variant'>) {
  return <ButtonSystem {...props} variant="secondary" />;
}

export function OutlineButton(props: Omit<ButtonSystemProps, 'variant'>) {
  return <ButtonSystem {...props} variant="outline" />;
}

export function GhostButton(props: Omit<ButtonSystemProps, 'variant'>) {
  return <ButtonSystem {...props} variant="ghost" />;
}

export function SuccessButton(props: Omit<ButtonSystemProps, 'variant'>) {
  return <ButtonSystem {...props} variant="success" />;
}

export function WarningButton(props: Omit<ButtonSystemProps, 'variant'>) {
  return <ButtonSystem {...props} variant="warning" />;
}

export function DangerButton(props: Omit<ButtonSystemProps, 'variant'>) {
  return <ButtonSystem {...props} variant="danger" />;
}

export function GradientButton(props: Omit<ButtonSystemProps, 'variant'>) {
  return <ButtonSystem {...props} variant="gradient" />;
}

// Icon buttons
export function IconButton({ 
  icon, 
  size = "md", 
  variant = "ghost",
  children,
  ...props 
}: Omit<ButtonSystemProps, 'icon'> & { icon: React.ReactNode }) {
  return (
    <ButtonSystem
      {...props}
      icon={icon}
      size={size}
      variant={variant}
      rounded="full"
      className="p-2"
    >
      {children || 'Icon button'}
    </ButtonSystem>
  );
}

// Floating action button
export function FloatingActionButton(props: Omit<ButtonSystemProps, 'size' | 'variant' | 'rounded'>) {
  return (
    <ButtonSystem
      {...props}
      size="lg"
      variant="gradient"
      rounded="full"
      className="fixed bottom-6 right-6 shadow-2xl hover:shadow-3xl z-50"
    />
  );
}

// Button group for related buttons
export function ButtonGroup({ 
  children, 
  className = "",
  spacing = "sm" 
}: { 
  children: React.ReactNode; 
  className?: string; 
  spacing?: "xs" | "sm" | "md" | "lg";
}) {
  const spacingStyles = {
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
  };

  return (
    <div className={`flex items-center ${spacingStyles[spacing]} ${className}`}>
      {children}
    </div>
  );
}

// Button card for wrapping buttons
export function ButtonCard({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
}
