import React from "react";
import "./flag-cube.css";

/**
 * Zentrierter & skalierter Cube.
 * Skalierung erfolgt proportional ohne Verschieben aus der linken Ecke.
 */
export default function FlagCube() {
  return (
    <div className="flag-cube-root">
      <div className="flag-cube-scale" data-cube>
        <div className="container">
          <div className="cube">
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

          <div className="cube">
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

          <div className="cube">
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
