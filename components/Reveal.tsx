'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Задержка появления, сек */
  delay?: number;
  /** Смещение по вертикали, px */
  y?: number;
  /** Длительность, сек */
  duration?: number;
  as?: ElementType;
  /** Показывать один раз (по умолчанию — да) */
  once?: boolean;
};

/**
 * Мягкое появление блока при попадании во вьюпорт.
 * При prefers-reduced-motion контент показывается сразу, без смещений.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  duration = 0.75,
  as = 'div',
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.01 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
    >
      {children}
    </MotionTag>
  );
}

/** Обёртка для «проявления» изображения: маска + лёгкий масштаб. */
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`overflow-hidden ${className ?? ''}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: reduce ? 0.01 : 1.05, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
