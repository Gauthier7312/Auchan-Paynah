import { cn } from '@/lib/utils'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
}

function Button({ children, className, variant = 'primary', size = 'medium', disabled = false, ...props }: ButtonProps) {
    return (
        <button className={cn(
            'w-full rounded-[40px] p-4  text-[20px] text-center transition-colors duration-300 cursor-pointer',
            variant === 'primary' && 'bg-primary text-white hover:bg-primary/80',
            variant === 'secondary' && 'bg-secondary',
            variant === 'outline' && 'border border-primary',
            variant === 'ghost' && 'bg-transparent',
            size === 'small' && 'h-[30px]',
            size === 'medium' && 'h-[40px]',
            size === 'large' && 'h-[60px]',
            disabled && 'opacity-50 cursor-not-allowed',
            className)} {...props}>
            {children}
        </button>
    )
}

export { Button }