import React from "react";
import "./flag-cube.css";

/**
 * Original Hover-Cube (Palästina-Farben nur bei Hover).
 * 1:1 Struktur wie dein statisches HTML:
 *  - 3 .cube Layer
 *  - je 3 Spalten (div mit --x/--y)
 *  - je 3 span mit --i
 * Gescoped in .fp-hero-cube damit keine Konflikte mit anderen .container/.cube Klassen.
 */
export default function FlagCube() {
  return (
    <div className="fp-hero-cube" aria-hidden="true">
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
