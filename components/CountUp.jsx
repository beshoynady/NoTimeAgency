'use client';

import { useEffect, useRef, useState } from 'react';

const EASE_OUT_CUBIC = (progress) => 1 - Math.pow(1 - progress, 3);

// Locale defaults to a fixed 'en-US' rather than the ambient environment
// locale: with SSR, an unpinned locale resolves independently on the server
// and in the browser (each picks up its own machine/OS locale), which for
// Arabic environments can format digits as Arabic-Indic on one side and
// Western on the other — a hydration mismatch. Pinning it also matches the
// brand's own convention of always showing Western numerals for stats, in
// English and Arabic alike.
const CountUp = ({ value, duration = 1600, decimals = 0, prefix = '', suffix = '', locale = 'en-US', className = '' }) => {
    const [display, setDisplay] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        const target = Number(value) || 0;

        if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setDisplay(target);
            return undefined;
        }

        let frame;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;

            observer.disconnect();

            const start = performance.now();
            const tick = (now) => {
                const progress = Math.min((now - start) / duration, 1);

                setDisplay(target * EASE_OUT_CUBIC(progress));

                if (progress < 1) frame = requestAnimationFrame(tick);
            };

            frame = requestAnimationFrame(tick);
        }, { threshold: 0.3 });

        observer.observe(node);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [value, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {display.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
            {suffix}
        </span>
    );
}

export default CountUp;

export { CountUp };
