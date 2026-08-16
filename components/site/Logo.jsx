import Image from 'next/image';

// Official lockup (design/NO TIME-11.png) — solid copper wordmark on a
// transparent square canvas, centered in a thin horizontal band. The
// container is deliberately much wider than tall so object-cover crops out
// the transparent top/bottom margin without touching the wordmark's own
// left/right edges or distorting its aspect ratio.
const LOGO_SRC = '/images/logo/NO TIME-11.png';

export default function Logo({ className = 'h-7 w-40 md:h-8 md:w-52', alt = 'NO TIME' }) {
  return (
    <span className={`relative block ${className}`}>
      <Image
        src={LOGO_SRC}
        alt={alt}
        fill
        sizes="220px"
        priority
        className="object-cover"
      />
    </span>
  );
}
