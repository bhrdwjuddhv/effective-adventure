import { memo } from 'react';
import { motion } from 'motion/react';

const FONT = "'Fredericka the Great', cursive";

const ProgressDots = memo(function ProgressDots({ total, current }) {
  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? '18px' : '6px',
            height: '6px',
            borderRadius: i === current ? '3px' : '50%',
            background: i === current
              ? 'rgba(242,237,216,0.85)'
              : i < current
                ? 'rgba(242,237,216,0.4)'
                : 'rgba(242,237,216,0.12)',
            transition: 'all 0.35s ease',
          }}
        />
      ))}
    </div>
  );
});

const ChalkPiece = memo(function ChalkPiece({ x, rotate, opacity = 1 }) {
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: '50%',
      transform: `translateY(-50%) rotate(${rotate}deg)`,
      width: '28px',
      height: '9px',
      background: `rgba(242,237,216,${opacity})`,
      borderRadius: '3px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    }} />
  );
});

const Blackboard = memo(function Blackboard({ children, stepIndex, totalSteps, stepLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      style={{ width: '100%' }}
    >
      <div style={{
        filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.45)) drop-shadow(0 4px 10px rgba(0,0,0,0.3))',
      }}>
        <div style={{
          background: 'linear-gradient(145deg, #7A4520 0%, #5C3318 30%, #4A2810 70%, #6B3D1A 100%)',
          padding: 'clamp(10px,2vw,20px)',
          borderRadius: '4px',
          boxShadow: 'inset 0 2px 4px rgba(255,200,100,0.1), inset 0 -2px 4px rgba(0,0,0,0.2)',
        }}>
          <div style={{
            aspectRatio: '2 / 1',
            width: '100%',
            background: `
              radial-gradient(ellipse at 20% 80%, rgba(0,0,0,0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(0,0,0,0.08) 0%, transparent 50%),
              linear-gradient(160deg, #1E4030 0%, #1A3828 40%, #1C3C2A 70%, #173320 100%)
            `,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255,255,255,0.012) 18px, rgba(255,255,255,0.012) 19px)`,
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `
                repeating-linear-gradient(30deg, transparent, transparent 120px, rgba(255,255,255,0.008) 120px, rgba(255,255,255,0.008) 121px),
                repeating-linear-gradient(-45deg, transparent, transparent 200px, rgba(255,255,255,0.005) 200px, rgba(255,255,255,0.005) 201px)
              `,
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.25), inset 0 0 120px rgba(0,0,0,0.12)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '15%',
              background: 'linear-gradient(to top, rgba(242,237,216,0.04), transparent)',
              pointerEvents: 'none',
            }} />

            <div style={{
              position: 'absolute',
              top: 'clamp(10px,2.5%,18px)', right: 'clamp(12px,3%,24px)',
              fontFamily: FONT, color: 'rgba(242,237,216,0.28)',
              fontSize: 'clamp(0.6rem,1vw,0.78rem)', letterSpacing: '0.1em', zIndex: 10,
            }}>
              {stepLabel}
            </div>

            <div style={{
              position: 'absolute',
              top: 'clamp(10px,2.5%,18px)', left: 'clamp(12px,3%,24px)',
              fontFamily: FONT, color: 'rgba(242,237,216,0.18)',
              fontSize: 'clamp(0.55rem,0.9vw,0.72rem)', letterSpacing: '0.08em',
              textTransform: 'uppercase', zIndex: 10,
            }}>
              EduFlow ERP
            </div>

            <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
              {children}
            </div>

            <div style={{
              position: 'absolute', bottom: 'clamp(8px,2%,16px)', left: 'clamp(12px,3%,28px)', zIndex: 20,
            }}>
              <ProgressDots total={totalSteps} current={stepIndex} />
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(180deg, #4A2810 0%, #3A1E08 100%)',
          height: 'clamp(14px,2.5vw,22px)',
          display: 'flex', alignItems: 'center', paddingLeft: '12%',
          position: 'relative', boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        }}>
          <ChalkPiece x="8%"  rotate={-4}  opacity={0.92} />
          <ChalkPiece x="13%" rotate={2}   opacity={0.70} />
          <ChalkPiece x="18%" rotate={-7}  opacity={0.82} />
          <ChalkPiece x="24%" rotate={3}   opacity={0.55} />
          <div style={{
            position: 'absolute', left: '8%', bottom: '2px',
            width: '80px', height: '4px',
            background: 'rgba(242,237,216,0.08)', filter: 'blur(2px)',
          }} />
        </div>
      </div>
    </motion.div>
  );
});

export default Blackboard;
