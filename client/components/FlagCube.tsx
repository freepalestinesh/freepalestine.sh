import React from "react";
import "./flag-cube.css";

export default function FlagCube() {
  return (
    <div className="flag-cube-shell" aria-hidden="true">
      <div className="flag-cube-wrapper">
        {/* Column group 1 */}
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

        {/* Column group 2 */}
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

        {/* Column group 3 */}
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
      <span className="flag-cube-fallback-text">▢</span>
    </div>
  );
}
