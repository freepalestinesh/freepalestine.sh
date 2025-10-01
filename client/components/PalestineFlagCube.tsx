import React, { useEffect, useRef, useState } from "react";
import "./palestine-flag-cube-stable.css";

export type ScaleMode = "fluid" | "stepped" | "none";

interface PalestineFlagCubeStableProps {
  baseSize?: number;
  minScale?: number;
  mode?: ScaleMode;
  steps?: number[];
  revertDurationSec?: number;
  disableHover?: boolean;
  className?: string;
  ariaLabel?: string;
  forceScale?: number;
}

const PalestineFlagCubeStable: React.FC<PalestineFlagCubeStableProps> = ({
  baseSize = 520,
  minScale = 0.55,
  mode = "stepped",
  steps = [0.6, 0.72, 0.85, 0.95, 1],
  revertDurationSec = 6,
  disableHover = false,
  className = "",
  ariaLabel = "",
  forceScale
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    if (typeof forceScale === "number") {
      setScale(forceScale);
      return;
    }
    if (mode === "none") {
      setScale(1);
      return;
    }
    const el = wrapperRef.current;
    if (!el) return;

    const compute = () => {
      const w = el.clientWidth;
      const raw = Math.min(1, w / baseSize);
      const clamped = Math.max(minScale, raw);
      if (mode === "fluid") {
        setScale(parseFloat(clamped.toFixed(3)));
      } else if (mode === "stepped") {
        const usable = steps
          .filter((s) => s <= clamped && s >= minScale)
          .sort((a, b) => b - a)[0] ?? minScale;
        setScale(usable);
      }
    };

    compute();
    let ro: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => compute());
      ro.observe(el);
    } else {
      const h = () => compute();
      window.addEventListener("resize", h);
      return () => window.removeEventListener("resize", h);
    }
    return () => { if (ro) ro.disconnect(); };
  }, [baseSize, minScale, mode, steps, forceScale]);

  const accessibility = ariaLabel
    ? { role: "img", "aria-label": ariaLabel }
    : { "aria-hidden": "true" };

  return (
    <div
      ref={wrapperRef}
      className={`pfc-root ${disableHover ? "pfc-no-hover" : ""} ${className}`}
      style={
        {
          "--pfc-base": `${baseSize}px`,
          "--pfc-scale": scale,
          "--pfc-revert": `${revertDurationSec}s`,
        } as React.CSSProperties
      }
      {...accessibility}
    >
      <div className="pfc-viewport">
        <div className="pfc-scale">
          <div className="pfc-container">
            {[0, 1, 2].map(layer => (
              <div className="pfc-layer" key={layer} data-layer={layer}>
                {[-1, 0, 1].map(x => (
                  <div
                    key={x}
                    className="pfc-col"
                    style={{ ["--x" as any]: x, ["--y" as any]: 0 }}
                  >
                    {[3, 2, 1].map(i => (
                      <span key={i} style={{ ["--i" as any]: i }} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PalestineFlagCubeStable;
