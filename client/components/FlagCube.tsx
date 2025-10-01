import React from "react";
import "./flag-cube.css";

/**
 * Original-Struktur wiederhergestellt:
 * container -> 3 * cube (Depth-Layer) -> je 3 Spalten -> je 3 span (Höhe)
 * CSS berechnet Offsets aus --layer (auto), --x, --i
 */
export default function FlagCube() {
  return (
    <div className="flag-cube-root">
      <div className="flag-cube-scale" data-cube>
        <div className="container">
          {/* Layer 0 */}
          <div className="cube" data-layer="0">
            <div style={{ ["--x" as any]: -1, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
            <div style={{ ["--x" as any]: 0, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
            <div style={{ ["--x" as any]: 1, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
          </div>

          {/* Layer 1 */}
          <div className="cube" data-layer="1">
            <div style={{ ["--x" as any]: -1, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
            <div style={{ ["--x" as any]: 0, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
            <div style={{ ["--x" as any]: 1, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
          </div>

            {/* Layer 2 */}
          <div className="cube" data-layer="2">
            <div style={{ ["--x" as any]: -1, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
            <div style={{ ["--x" as any]: 0, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
            <div style={{ ["--x" as any]: 1, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
