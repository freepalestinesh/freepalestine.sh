import React from "react";
import "./flag-cube.css";

/**
 * Gescopte Legacy-Variante (Wrapper .fp-legacy-cube)
 * Verhindert Konflikte mit anderen .container/.cube Klassen.
 */
export default function FlagCube() {
  return (
    <div className="fp-legacy-cube" aria-hidden="true">
      <div className="fp-container">
        {[0, 1, 2].map(layer => (
          <div className="fp-cube" key={layer}>
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
