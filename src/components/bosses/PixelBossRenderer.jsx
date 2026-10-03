import React, { useEffect, useRef, useState } from 'react';
import { drawBossCanvas } from '../../utils/pixelRenderer';
import { playBossActionSound } from '../../utils/audioSynth';

export function PixelBossRenderer({
  bossId = 'warden',
  scale = 2.4,
  onRoar,
  activeAction = 'idle',
  onActionComplete,
  actions = []
}) {
  const canvasRef = useRef(null);
  const [currentAction, setCurrentAction] = useState('idle');
  const actionRef = useRef('idle');
  const actionStartTimeRef = useRef(0);
  const shakeTriggeredRef = useRef(false);
  const actionIndexRef = useRef(0);

  // Sync external activeAction if provided
  useEffect(() => {
    if (activeAction && activeAction !== 'idle' && activeAction !== actionRef.current) {
      triggerAction(activeAction);
    }
  }, [activeAction]);

  const triggerAction = (actionId) => {
    actionRef.current = actionId;
    setCurrentAction(actionId);
    actionStartTimeRef.current = performance.now();
    shakeTriggeredRef.current = false;
    playBossActionSound(bossId, actionId);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 300);
    const height = (canvas.height = 310);

    let animId;
    const ACTION_DURATION = 1500; // ms

    const render = (now) => {
      const time = now * 0.005;
      let progress = 0;

      if (actionRef.current !== 'idle') {
        const elapsed = now - actionStartTimeRef.current;
        progress = Math.min(1, elapsed / ACTION_DURATION);

        // Screen shake trigger at peak impact window (35% to 50%)
        if (progress >= 0.38 && !shakeTriggeredRef.current) {
          shakeTriggeredRef.current = true;
          if (onRoar) onRoar();
        }

        // Action finished
        if (progress >= 1) {
          actionRef.current = 'idle';
          setCurrentAction('idle');
          if (onActionComplete) onActionComplete();
        }
      }

      drawBossCanvas(ctx, bossId, width, height, {
        time,
        scale,
        isRoaring: actionRef.current === 'roar' || actionRef.current === 'wrath' || actionRef.current === 'tantrum',
        action: actionRef.current,
        actionProgress: progress
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [bossId, scale, onRoar, onActionComplete]);

  // Click canvas: cycle through available boss actions
  const handleClick = () => {
    if (actionRef.current !== 'idle') return; // already animating

    if (actions && actions.length > 0) {
      const nextAction = actions[actionIndexRef.current % actions.length];
      actionIndexRef.current = (actionIndexRef.current + 1) % actions.length;
      triggerAction(nextAction.id);
    } else {
      triggerAction('roar');
    }
  };

  // Find active action metadata
  const currentActionMeta = actions.find((a) => a.id === currentAction);

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer group select-none"
      onClick={handleClick}
      title="Click boss to trigger signature attack!"
    >
      <canvas ref={canvasRef} className="block pixelated max-w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" />

      {/* Dynamic Action Status Badge */}
      <div className="absolute bottom-1 pointer-events-none transition-all">
        {currentAction !== 'idle' ? (
          <span className="px-3 py-1 bg-[#ef4444]/90 border-2 border-[#fbbf24] text-[#fde047] font-pixel text-[8px] tracking-wider scale-105 shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-pulse flex items-center gap-1.5">
            <span>{currentActionMeta?.icon || '💥'}</span>
            <span>CASTING: {currentActionMeta?.name?.toUpperCase() || currentAction.toUpperCase()}!</span>
          </span>
        ) : (
          <span className="px-2.5 py-0.5 bg-[#080d17]/90 border border-[#22d3ee] text-[#22d3ee] font-pixel text-[7.5px] tracking-wider group-hover:scale-105 group-hover:border-[#38bdf8] group-hover:bg-[#0c1322] shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all flex items-center gap-1">
            <span>⚔️</span>
            <span>CLICK TO TRIGGER ATTACK</span>
          </span>
        )}
      </div>
    </div>
  );
}
