import React from "react";
import "./flag-cube.css";

/**
 * Legacy Palestine Flag Cube – Hover-only Farben.
 * Keine dynamische Skalierung / Logik.
 */
export default function FlagCube() {
  return (
    <div className="flagcube-root" aria-hidden="true">
      <div className="container">
        {[0, 1, 2].map(layer => (
          <div className="cube" key={layer}>
            {[-1, 0, 1].map(x => (
              <div key={x} style={{ ["--x" as any]: x, ["--y" as any]: 0 }}>
                {[3, 2, 1].map(i => (
                  <span key={i} style={{ ["--i" as any]: i }} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
