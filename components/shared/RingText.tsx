export function RingText({
  words,
  className,
  style
}: {
  words: string[];
  className?: string;
  style?: React.CSSProperties;
}) {
  const chars = `${words.join(' · ')} ·`.split('');
  const angleStep = 360 / chars.length;
  return (
    <div
      className={[className, '[container-type:size]']
        .filter(Boolean)
        .join(' ')}
      style={{ position: 'relative', ...style }}
      aria-hidden="true"
    >
      {chars.map((char, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            whiteSpace: 'nowrap',
            fontSize: '9cqh',
            letterSpacing: '0.02em',
            transformOrigin: '0 0',
            transform: `rotate(${angleStep * i}deg) translate(-50%, -40cqh)`
          }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </div>
  );
}
