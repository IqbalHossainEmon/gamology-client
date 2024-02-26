export default function ArrowIcon({ id, className, stroke = 'rgba(255, 255, 255, 0.6)' }) {
  return (
    <svg id={id} className={`${className || ''}`} viewBox="0 0 23 23">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        paintOrder="fill markers"
        stroke={stroke}
        fill="none"
        strokeWidth="3px"
        d="M 21.5 1.5 L 11.5 21.5 L 1.5 1.5"
      />
    </svg>
  );
}
