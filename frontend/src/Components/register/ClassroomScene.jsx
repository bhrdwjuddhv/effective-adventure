import { memo } from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

/* Stable style references so StickyNote memo comparison works correctly */
const STICKY_1_STYLE = { top: '11%', right: '6%' };
const STICKY_2_STYLE = { top: '22%', left: '16%' };
const STICKY_3_STYLE = { bottom: '22%', right: '5%' };

const NoticeBoard = memo(function NoticeBoard() {
  return (
    <motion.div
      className="hidden lg:block"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      style={{ position: 'absolute', top: '8%', left: '2%', zIndex: 5 }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #C49A6C 0%, #B8864A 60%, #C49A6C 100%)',
        border: '5px solid #8B6520', padding: '10px',
        boxShadow: '4px 5px 12px rgba(0,0,0,0.25)', width: '170px',
      }}>
        <div style={{
          position: 'absolute', top: '-7px', left: '50%', transform: 'translateX(-50%)',
          width: '13px', height: '13px', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #E53935, #B71C1C)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }} />
        <div style={{
          background: '#FEFEF0', border: '1px solid #E0D8C0', padding: '10px 10px 8px',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
            <div style={{
              width: '16px', height: '16px', backgroundColor: '#ea681c',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Zap size={10} color="white" strokeWidth={3} />
            </div>
            <span style={{ fontFamily: "'Fredericka the Great', cursive", fontSize: '11px', fontWeight: 'bold', color: '#1a3a28' }}>
              EduFlow ERP
            </span>
          </div>
          <p style={{ fontFamily: "'Fredericka the Great', cursive", fontSize: '8.5px', color: '#4a6a58', lineHeight: 1.4, margin: '0 0 6px' }}>
            Complete School Management Platform
          </p>
          <div style={{ height: '1px', background: '#CCC', margin: '5px 0' }} />
          <p style={{ fontFamily: "'Fredericka the Great', cursive", fontSize: '8px', color: '#999', margin: 0 }}>
            User Registration
          </p>
        </div>
        <div style={{
          position: 'absolute', bottom: '-6px', right: '20%',
          width: '10px', height: '10px', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #FFB300, #F57F17)',
          boxShadow: '0 2px 3px rgba(0,0,0,0.25)',
        }} />
      </div>
    </motion.div>
  );
});

const ClassroomWindow = memo(function ClassroomWindow() {
  return (
    <motion.div
      className="hidden xl:block"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      style={{ position: 'absolute', top: '5%', right: '2%', zIndex: 5 }}
    >
      <div style={{
        width: '90px', height: '120px', border: '5px solid #6B5231',
        background: 'linear-gradient(135deg, #D4EAF7 0%, #A8C8E0 100%)',
        position: 'relative',
        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.35), 3px 4px 10px rgba(0,0,0,0.2)',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', background: '#6B5231', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '4px', background: '#6B5231', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 55%)' }} />
      </div>
      <div style={{ height: '8px', background: '#8B6231', boxShadow: '0 3px 6px rgba(0,0,0,0.2)', marginTop: '-1px' }} />
    </motion.div>
  );
});

const BOOKS = [
  { color: '#C0392B', width: 68, label: 'Math' },
  { color: '#2471A3', width: 74, label: 'Science' },
  { color: '#1E8449', width: 60, label: 'History' },
  { color: '#D35400', width: 70, label: 'English' },
  { color: '#6C3483', width: 56, label: 'Hindi' },
];

const BooksStack = memo(function BooksStack() {
  return (
    <motion.div
      className="hidden lg:block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      style={{ position: 'absolute', bottom: '10%', left: '2%', zIndex: 5 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {BOOKS.map((book, i) => (
          <div key={i} style={{
            width: `${book.width}px`, height: '17px',
            background: `linear-gradient(90deg, ${book.color} 0%, ${book.color}CC 100%)`,
            borderRadius: '2px', boxShadow: '2px 2px 4px rgba(0,0,0,0.22)',
            display: 'flex', alignItems: 'center', paddingLeft: '7px',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '6.5px', fontFamily: "'Fredericka the Great', cursive" }}>
              {book.label}
            </span>
          </div>
        ))}
      </div>
      <div style={{ height: '3px', background: 'rgba(0,0,0,0.12)', marginTop: '1px', borderRadius: '0 0 2px 2px' }} />
    </motion.div>
  );
});

const Globe = memo(function Globe() {
  return (
    <motion.div
      className="hidden xl:block"
      style={{ position: 'absolute', bottom: '8%', right: '2%', zIndex: 5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        <div style={{
          width: '68px', height: '68px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #3498DB 30%, #2471A3 80%)',
          border: '3px solid #1A5276', position: 'relative', overflow: 'hidden',
          boxShadow: '3px 4px 10px rgba(0,0,0,0.28)',
        }}>
          {[30, 52, 72].map((pct) => (
            <div key={pct} style={{ position: 'absolute', left: 0, right: 0, top: `${pct}%`, height: '1px', background: 'rgba(255,255,255,0.22)' }} />
          ))}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', background: 'rgba(255,255,255,0.22)', transform: 'translateX(-50%)' }} />
          <div style={{ position: 'absolute', top: '12%', left: '18%', width: '28%', height: '34%', background: '#27AE60', borderRadius: '40% 60% 55% 35%', opacity: 0.85 }} />
          <div style={{ position: 'absolute', top: '50%', right: '15%', width: '22%', height: '20%', background: '#27AE60', borderRadius: '60% 40% 50% 50%', opacity: 0.75 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 55%)' }} />
        </div>
        <div style={{ width: '4px', height: '14px', background: '#5D4037', margin: '0 auto' }} />
        <div style={{ width: '50px', height: '6px', background: '#4E342E', borderRadius: '3px', margin: '0 auto' }} />
      </motion.div>
    </motion.div>
  );
});

const StickyNote = memo(function StickyNote({ color, noteStyle, text, rotation = 0 }) {
  return (
    <motion.div
      className="hidden lg:block"
      style={{ position: 'absolute', zIndex: 5, ...noteStyle }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ delay: 0.9, duration: 0.5 }}
    >
      <motion.div
        animate={{ rotate: [rotation - 1.5, rotation + 1.5, rotation - 1.5] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        style={{
          width: '72px', height: '72px', backgroundColor: color,
          padding: '8px', boxShadow: '2px 3px 8px rgba(0,0,0,0.18)',
        }}
      >
        <div style={{
          position: 'absolute', bottom: 0, right: 0, width: '14px', height: '14px',
          background: 'rgba(0,0,0,0.08)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
        }} />
        <p style={{
          fontFamily: "'Fredericka the Great', cursive",
          fontSize: '9px', color: 'rgba(0,0,0,0.55)', lineHeight: 1.45, margin: 0, whiteSpace: 'pre-line',
        }}>
          {text}
        </p>
      </motion.div>
    </motion.div>
  );
});

const Pencils = memo(function Pencils() {
  return (
    <motion.div
      className="hidden xl:block"
      style={{ position: 'absolute', top: '20%', right: '5%', zIndex: 5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {[{ rotate: -30, left: 0 }, { rotate: -22, left: 12 }].map((p, i) => (
        <div key={i} style={{ position: 'absolute', left: `${p.left}px`, bottom: 0, transform: `rotate(${p.rotate}deg)`, transformOrigin: 'bottom center' }}>
          <div style={{ width: '10px', height: '65px', background: 'linear-gradient(90deg, #F5C518, #E6B400)', borderRadius: '2px 2px 0 0' }} />
          <div style={{ width: '10px', height: '6px', background: '#B0BEC5' }} />
          <div style={{ width: '10px', height: '7px', background: '#EF9A9A', borderRadius: '0 0 2px 2px' }} />
          <div style={{ position: 'absolute', top: '-8px', left: 0, right: 0, height: '10px', background: '#8D6E63', clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
        </div>
      ))}
    </motion.div>
  );
});

const GeometryBox = memo(function GeometryBox() {
  return (
    <motion.div
      className="hidden xl:block"
      style={{ position: 'absolute', bottom: '12%', left: '10%', zIndex: 5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.5 }}
    >
      <div style={{
        width: '90px', height: '14px',
        background: 'linear-gradient(180deg, #FFF9C4, #FFF176)',
        border: '1px solid #F9A825', position: 'relative',
        transform: 'rotate(-10deg)', boxShadow: '1px 2px 4px rgba(0,0,0,0.15)',
      }}>
        {[10, 20, 30, 40, 50, 60, 70, 80].map((x) => (
          <div key={x} style={{ position: 'absolute', left: `${x}%`, top: 0, width: '1px', height: x % 20 === 0 ? '8px' : '5px', background: '#F9A825' }} />
        ))}
      </div>
    </motion.div>
  );
});

const Floor = memo(function Floor() {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
      background: 'linear-gradient(180deg, #8B7355 0%, #6B5335 60%, #5A4028 100%)',
      boxShadow: '0 -3px 12px rgba(0,0,0,0.18)',
    }}>
      {[15, 35, 55, 75].map((pct) => (
        <div key={pct} style={{ position: 'absolute', top: '30%', bottom: 0, left: `${pct}%`, width: '1px', background: 'rgba(0,0,0,0.07)' }} />
      ))}
    </div>
  );
});

/* Pure background + decorations component — no children, never re-renders after mount */
const ClassroomScene = memo(function ClassroomScene() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, #DBC89A 0%, #EAD9B5 35%, #E2CFA8 100%)',
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(0,0,0,0.018) 120px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: 0, right: 0, height: '2px',
        background: 'rgba(0,0,0,0.06)', pointerEvents: 'none',
      }} />

      <NoticeBoard />
      <ClassroomWindow />
      <BooksStack />
      <Globe />
      <GeometryBox />
      <Pencils />

      <StickyNote color="#FFE66D" noteStyle={STICKY_1_STYLE} text={"Don't forget\nRoll No: 42"} rotation={4} />
      <StickyNote color="#FF8FAB" noteStyle={STICKY_2_STYLE} text={"Submit\nforms by\nFriday!"} rotation={-5} />
      <StickyNote color="#B2EBF2" noteStyle={STICKY_3_STYLE} text={"PTM\n10 Nov"} rotation={3} />

      <Floor />
    </div>
  );
});

export default ClassroomScene;
