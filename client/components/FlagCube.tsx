import React from "react";
import "./flag-cube.css";

interface FlagCubeProps {
  /** x Koordinate innerhalb des umschließenden (position:relative) Containers */
  x?: string | number;
  /** y Koordinate innerhalb des umschließenden (position:relative) Containers */
  y?: string | number;
  /** Referenzpunkt des Würfels für x/y */
  anchor?: 'top-left' | 'center';
  /** Zusätzliche Klassen (z.B. z-index Steuerung) */
  className?: string;
  /** Optional explizite Breite/Höhe (quadratisch); Standard aus CSS */
  size?: number;
  /** Z-Index override */
  zIndex?: number;
  /** Optischer Ausgleich horizontal (z.B. weil isometrische Form links schwerer wirkt) */
  offsetX?: string | number;
  /** Optischer Ausgleich vertikal */
  offsetY?: string | number;
}

export default function FlagCube({
  x = '50%',
  y = '50%',
  anchor = 'center',
  className = '',
  size,
  zIndex,
  offsetX = 0,
  offsetY = 0,
}: FlagCubeProps) {
  const norm = (v: string | number) => typeof v === 'number' ? `${v}px` : v;
  const translate = anchor === 'center'
    ? `translate(-50%, -50%) translate(${norm(offsetX)}, ${norm(offsetY)})`
    : 'none';
  const cubeStyle: React.CSSProperties = {
    position: 'absolute',
    top: y,
    left: x,
    transform: translate,
    width: size ? `${size}px` : undefined,
    height: size ? `${size}px` : undefined,
    zIndex,
    pointerEvents: 'none',
  };

  return (
    <div className={`fp-hero-cube ${className}`} aria-hidden="true" style={cubeStyle}>
      <div className="container">
        {[0, 1, 2].map(layer => (
          <div className="cube" key={layer}>
            {[-1, 0, 1].map(xPos => (
              <div key={xPos} style={{ ["--x" as any]: xPos, ["--y" as any]: 0 }}>
                {[3, 2, 1].map(i => (
                  <span 
                    key={i} 
                    style={{ 
                      ["--i" as any]: i,
                    }} 
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
