import React from "react";
import "./flag-cube.css";

/**
 * Original 3-Layer Cube (umbenannte Klassen zur Kollisionsvermeidung).
 * Layer werden durch DOM-Reihenfolge transformiert (fc-layer:nth-child).
 */
export default function FlagCube() {
  return (
    <div className="fc-root">
      <div className="fc-scale" data-cube>
        <div className="fc-container">
          <div className="fc-layer">
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

          <div className="fc-layer">
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

          <div className="fc-layer">
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
