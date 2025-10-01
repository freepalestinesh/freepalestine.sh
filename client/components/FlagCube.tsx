import React from "react";
import "./flag-cube.css";

type FlagCubeProps = {
  scale?: number;
};

export default function FlagCube({ scale = 1 }: FlagCubeProps) {
  return (
    <div className="flag-cube-root" style={{ ["--fc-scale" as any]: scale }}>
      <div className="flag-cube-scale" data-cube>
        <div className="cube-grid">
          {/* 3 Layer à 3 Säulen à 3 Elemente */}
          {[0, 1, 2].map(layer => (
            <div className="cube-row" key={layer} data-layer={layer}>
              {[-1, 0, 1].map(x => (
                <div
                  className="cube-stack"
                  key={x}
                  style={{ ["--x" as any]: x, ["--y" as any]: 0 }}
                >
                  {[3, 2, 1].map(i => {
                    // Beispiel-Farbzuordnung (anpassen!):
                    // Obere Reihe farbig, Rest neutral
                    let cls = "";
                    if (layer === 0) {
                      if (x === -1) cls = "c-red";
                      if (x === 0) cls = "c-black";
                      if (x === 1) cls = "c-green";
                    } else if (layer === 1) {
                      cls = "c-white";
                    }
                    return (
                      <span
                        key={i}
                        style={{ ["--i" as any]: i }}
                        className={cls}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
