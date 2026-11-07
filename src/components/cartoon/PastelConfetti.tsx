import React from 'react';

export const PastelConfetti: React.FC = () => {
  // Pre-configured calm pastel confetti elements with varying delays and gentle drifts
  const confettiPieces = [
    { id: 1, left: '10%', delay: '0s', duration: '5.2s', size: 14, color: '#FFB74D', type: 'circle' },
    { id: 2, left: '25%', delay: '1.2s', duration: '5.8s', size: 16, color: '#81D4FA', type: 'star' },
    { id: 3, left: '40%', delay: '0.4s', duration: '4.8s', size: 12, color: '#F48FB1', type: 'rect' },
    { id: 4, left: '55%', delay: '2.1s', duration: '6.0s', size: 15, color: '#A5D6A7', type: 'circle' },
    { id: 5, left: '70%', delay: '0.8s', duration: '5.4s', size: 14, color: '#CE93D8', type: 'star' },
    { id: 6, left: '85%', delay: '1.6s', duration: '4.9s', size: 16, color: '#FFE082', type: 'rect' },
    { id: 7, left: '18%', delay: '2.8s', duration: '5.5s', size: 13, color: '#80CBC4', type: 'circle' },
    { id: 8, left: '32%', delay: '3.2s', duration: '5.1s', size: 15, color: '#FFAB91', type: 'star' },
    { id: 9, left: '62%', delay: '2.5s', duration: '5.6s', size: 14, color: '#B39DDB', type: 'rect' },
    { id: 10, left: '78%', delay: '3.6s', duration: '5.3s', size: 12, color: '#81D4FA', type: 'circle' },
    { id: 11, left: '48%', delay: '1.9s', duration: '6.2s', size: 16, color: '#FFF59D', type: 'star' },
    { id: 12, left: '92%', delay: '0.2s', duration: '5.0s', size: 13, color: '#FFCC80', type: 'circle' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {confettiPieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 opacity-0"
          style={{
            left: p.left,
            animation: `float-confetti ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        >
          {p.type === 'circle' && (
            <div
              className="rounded-full shadow-sm"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
            />
          )}

          {p.type === 'rect' && (
            <div
              className="rounded-sm shadow-sm"
              style={{
                width: p.size * 1.3,
                height: p.size * 0.7,
                backgroundColor: p.color,
                transform: 'rotate(25deg)',
              }}
            />
          )}

          {p.type === 'star' && (
            <svg
              width={p.size * 1.2}
              height={p.size * 1.2}
              viewBox="0 0 24 24"
              fill={p.color}
              className="drop-shadow-sm"
            >
              <path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.6-6.2 4.6 2.3-7.3-6.1-4.5h7.6z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
