import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Animation safety for headless/preview environments.
 *
 * In headless browsers (used for preview screenshots) `document.visibilityState`
 * is often 'hidden', which pauses requestAnimationFrame. GSAP tweens then freeze
 * mid-flight. This keeps the ticker lively and, after a bounded wait, forces any
 * in-flight tweens plus ScrollTrigger-bound animations to their final state so a
 * screenshot at any scroll position shows the composed UI.
 */
export function installGsapSafety() {
  if (typeof window === 'undefined') return;

  // Keep the ticker as lively as possible
  gsap.ticker.lagSmoothing(0);
  gsap.config({ autoSleep: 60 });

  const forceComplete = () => {
    // Fast-forward all running tweens on the global timeline
    const tweens = gsap.globalTimeline.getChildren(true, true, true) as gsap.core.Tween[];
    tweens.forEach((t) => {
      if (t && typeof t.progress === 'function' && !t.paused()) {
        try {
          t.progress(1);
        } catch {
          /* noop */
        }
      }
    });

    // ScrollTrigger-bound tweens are not attached to the global timeline until
    // the trigger fires. For below-fold content in a headless preview the
    // trigger never fires, so force each one to its end state.
    try {
      ScrollTrigger.getAll().forEach((st) => {
        const anim = st.animation;
        if (anim && typeof anim.progress === 'function') {
          try {
            anim.progress(1);
          } catch {
            /* noop */
          }
        }
      });
    } catch {
      /* noop */
    }
  };

  // Multiple passes so late-mounting components (Silk, CardSwap) get caught
  window.setTimeout(forceComplete, 3500);
  window.setTimeout(forceComplete, 6000);
  window.setTimeout(forceComplete, 9000);

  const onVis = () => {
    if (document.visibilityState === 'visible') {
      gsap.ticker.wake();
      try {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      } catch {
        /* noop */
      }
    }
  };
  document.addEventListener('visibilitychange', onVis);

  window.addEventListener('focus', () => {
    gsap.ticker.wake();
    try {
      ScrollTrigger.refresh();
    } catch {
      /* noop */
    }
  });
}
