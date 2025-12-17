import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
    text: string;
    delay?: number;
    stepDuration?: number;
    animateBy?: 'words' | 'letters';
    direction?: 'top' | 'bottom';
    threshold?: number;
    rootMargin?: string;
    onAnimationComplete?: () => void;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

const BlurText = ({
    text,
    delay = 50,
    stepDuration = 0.5,
    animateBy = 'words',
    direction = 'top',
    threshold = 0.1,
    rootMargin = '0px',
    onAnimationComplete,
    className = '',
    align = 'left',
}: BlurTextProps) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold, rootMargin]);

    const items = animateBy === 'words' ? text.split(' ') : text.split('');

    const directionOffset = direction === 'top' ? -20 : 20;

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: delay / 1000,
                onComplete: onAnimationComplete,
            },
        },
    };

    const item = {
        hidden: {
            opacity: 0,
            y: directionOffset,
            filter: 'blur(10px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: stepDuration,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: animateBy === 'words' ? '0.25em' : '0',
                justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
            }}
        >
            {items.map((el, i) => (
                <motion.span key={i} variants={item}>
                    {el}
                    {animateBy === 'words' && i !== items.length - 1 && '\u00A0'}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default BlurText;