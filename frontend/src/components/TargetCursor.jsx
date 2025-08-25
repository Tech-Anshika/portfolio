import { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import "./TargetCursor.css";

const TargetCursor = ({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
}) => {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const spinTl = useRef(null);
  const dotRef = useRef(null);
  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12,
      parallaxStrength: 0.00005,
    }),
    []
  );

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;
    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll(".target-cursor-corner");

    let activeTarget = null;
    let currentTargetMove = null;
    let currentLeaveHandler = null;
    let isAnimatingToTarget = false;
    let resumeTimeout = null;

    const cleanupTarget = (target) => {
      if (currentTargetMove) target.removeEventListener("mousemove", currentTargetMove);
      if (currentLeaveHandler) target.removeEventListener("mouseleave", currentLeaveHandler);
      currentTargetMove = null;
      currentLeaveHandler = null;
    };

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const createSpinTimeline = () => {
      if (spinTl.current) spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });
    };
    createSpinTimeline();

    const moveHandler = (e) => moveCursor(e.clientX, e.clientY);
    window.addEventListener("mousemove", moveHandler);

    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return;
      const mouseX = gsap.getProperty(cursorRef.current, "x");
      const mouseY = gsap.getProperty(cursorRef.current, "y");
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);
      if (!isStillOverTarget && currentLeaveHandler) currentLeaveHandler();
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };
    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    const enterHandler = (e) => {
      const target = e.target.closest(targetSelector);
      if (!target || activeTarget === target) return;

      if (activeTarget) cleanupTarget(activeTarget);
      if (resumeTimeout) clearTimeout(resumeTimeout);

      activeTarget = target;
      gsap.killTweensOf(cursorRef.current, "rotation");
      spinTl.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

      const updateCorners = (mouseX, mouseY) => {
        const rect = target.getBoundingClientRect();
        const cursorRect = cursorRef.current.getBoundingClientRect();
        const cursorCenterX = cursorRect.left + cursorRect.width / 2;
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;
        const [tlc, trc, brc, blc] = Array.from(cornersRef.current);
        const { borderWidth, cornerSize, parallaxStrength } = constants;

        let tlOffset = { x: rect.left - cursorCenterX - borderWidth, y: rect.top - cursorCenterY - borderWidth };
        let trOffset = { x: rect.right - cursorCenterX + borderWidth - cornerSize, y: rect.top - cursorCenterY - borderWidth };
        let brOffset = { x: rect.right - cursorCenterX + borderWidth - cornerSize, y: rect.bottom - cursorCenterY + borderWidth - cornerSize };
        let blOffset = { x: rect.left - cursorCenterX - borderWidth, y: rect.bottom - cursorCenterY + borderWidth - cornerSize };

        if (mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;
          tlOffset.x += mouseOffsetX;
          tlOffset.y += mouseOffsetY;
          trOffset.x += mouseOffsetX;
          trOffset.y += mouseOffsetY;
          brOffset.x += mouseOffsetX;
          brOffset.y += mouseOffsetY;
          blOffset.x += mouseOffsetX;
          blOffset.y += mouseOffsetY;
        }

        const tl = gsap.timeline();
        const corners = [tlc, trc, brc, blc];
        const offsets = [tlOffset, trOffset, brOffset, blOffset];
        corners.forEach((corner, i) => {
          tl.to(corner, { x: offsets[i].x, y: offsets[i].y, duration: 0.2, ease: "power2.out" }, 0);
        });
      };

      let moveThrottle = null;
      const targetMove = (ev) => {
        if (moveThrottle) return;
        moveThrottle = requestAnimationFrame(() => {
          updateCorners(ev.clientX, ev.clientY);
          moveThrottle = null;
        });
      };
      const leaveHandler = () => {
        activeTarget = null;
        if (!cornersRef.current) return;
        const corners = Array.from(cornersRef.current);
        const { cornerSize } = constants;
        const positions = [
          { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: cornerSize * 0.5 },
          { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
        ];
        const tl = gsap.timeline();
        corners.forEach((c, i) => tl.to(c, { x: positions[i].x, y: positions[i].y, duration: 0.3, ease: "power3.out" }, 0));
        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(cursorRef.current, "rotation") % 360;
            spinTl.current.kill();
            spinTl.current = gsap.timeline({ repeat: -1 }).to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
            gsap.to(cursorRef.current, { rotation: currentRotation + 360, duration: spinDuration * (1 - currentRotation / 360), ease: "none", onComplete: () => spinTl.current?.restart() });
          }
          resumeTimeout = null;
        }, 50);
        cleanupTarget(target);
      };
      currentTargetMove = targetMove;
      currentLeaveHandler = leaveHandler;

      target.addEventListener("mousemove", targetMove);
      target.addEventListener("mouseleave", leaveHandler);
      updateCorners();
    };

    window.addEventListener("mouseover", enterHandler, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("scroll", scrollHandler);
      if (activeTarget) cleanupTarget(activeTarget);
      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor]);

  useEffect(() => {
    if (!cursorRef.current || !spinTl.current) return;
    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap.timeline({ repeat: -1 }).to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
    }
  }, [spinDuration]);

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
};

export default TargetCursor;
