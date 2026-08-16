'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

const ScrollToTop = () => {
    const pathname = usePathname();

    useLayoutEffect(() => {
        const hash = window.location.hash;

        if (hash) {
            const target = document.getElementById(hash.slice(1));

            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);

    return null;
}

export default ScrollToTop;

export { ScrollToTop };
