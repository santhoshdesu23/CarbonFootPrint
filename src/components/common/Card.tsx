import type { HTMLAttributes, ReactNode } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur ${className}`} {...props}>
      {children}
    </div>
  );
}
