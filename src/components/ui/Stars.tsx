export default function Stars() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      3.5
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={index < 3 ? 'gold' : index === 3 ? 'url(#half)' : 'gray'}
          width="20"
          height="20"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="gold" />
              <stop offset="50%" stopColor="gray" />
            </linearGradient>
          </defs>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}
