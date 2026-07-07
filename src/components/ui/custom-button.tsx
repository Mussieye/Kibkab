"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "success" | "warning" | "danger";
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

export function CustomButton({
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
  className,
  as: Component = href ? "a" : "button",
  type = "button",
  target,
  rel,
  ...props
}: CustomButtonProps) {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";
  
  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-royal-purple to-gold text-white hover:from-royal-purple/90 hover:to-gold/90 focus:ring-gold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary: "bg-white text-royal-purple border-2 border-royal-purple hover:bg-royal-purple hover:text-white focus:ring-royal-purple shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
    outline: "bg-transparent text-royal-purple border-2 border-royal-purple hover:bg-royal-purple hover:text-white focus:ring-royal-purple transform hover:-translate-y-0.5",
    ghost: "bg-transparent text-royal-purple hover:bg-royal-purple/10 focus:ring-royal-purple",
    success: "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 focus:ring-green-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 focus:ring-yellow-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    danger: "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 focus:ring-red-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
  };

  const classes = cn(
    baseClasses,
    sizeClasses[size],
    roundedClasses[rounded],
    variantClasses[variant],
    fullWidth && "w-full",
    isPressed && "transform scale-95",
    isHovered && !disabled && !loading && "transform -translate-y-1",
    className
  );

  const getLoadingText = () => {
    switch (language) {
      case 'es': return 'Cargando...';
      case 'fr': return 'Chargement...';
      case 'nl': return 'Laden...';
      default: return 'Loading...';
    }
  };

  const renderContent = () => (
    <>
      <span className={cn(
        "flex items-center gap-2 transition-opacity duration-200",
        loading && "opacity-0"
      )}>
        {icon && iconPosition === "left" && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        <span className="truncate">{children}</span>
        {icon && iconPosition === "right" && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </span>
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
            <span className="text-sm">{getLoadingText()}</span>
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
    </>
  );

  const handleClick = () => {
    if (!disabled && !loading) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      onClick?.();
    }
  };

  const commonProps = {
    className: classes,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onClick: handleClick,
    disabled: disabled || loading,
    ...props
  };

  if (Component === "a") {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        {...commonProps}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <Component
      type={type}
      {...commonProps}
    >
      {renderContent()}
    </Component>
  );
}

// Pre-styled button variants for common use cases
export function PrimaryButton(props: Omit<CustomButtonProps, 'variant'>) {
  return <CustomButton {...props} variant="primary" />;
}

export function SecondaryButton(props: Omit<CustomButtonProps, 'variant'>) {
  return <CustomButton {...props} variant="secondary" />;
}

export function OutlineButton(props: Omit<CustomButtonProps, 'variant'>) {
  return <CustomButton {...props} variant="outline" />;
}

export function SuccessButton(props: Omit<CustomButtonProps, 'variant'>) {
  return <CustomButton {...props} variant="success" />;
}

export function WarningButton(props: Omit<CustomButtonProps, 'variant'>) {
  return <CustomButton {...props} variant="warning" />;
}

export function DangerButton(props: Omit<CustomButtonProps, 'variant'>) {
  return <CustomButton {...props} variant="danger" />;
}

// Icon buttons
export function IconButton({ 
  icon, 
  size = "md", 
  variant = "ghost",
  children,
  ...props 
}: Omit<CustomButtonProps, 'icon'> & { icon: React.ReactNode }) {
  return (
    <CustomButton
      {...props}
      icon={icon}
      size={size}
      variant={variant}
      rounded="full"
      className="p-2"
    >
      <span className="sr-only">{children || 'Icon button'}</span>
    </CustomButton>
  );
}

// Floating action button
export function FloatingActionButton(props: Omit<CustomButtonProps, 'size' | 'variant' | 'rounded'>) {
  return (
    <CustomButton
      {...props}
      size="lg"
      variant="primary"
      rounded="full"
      className="fixed bottom-6 right-6 shadow-2xl hover:shadow-3xl"
    />
  );
}
