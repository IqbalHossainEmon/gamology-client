import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./RippleEffect.module.css";

type Props = {
  background?: string;
  long?: boolean;
};

type WaterDrop = {
  id: number;
  x: number;
  y: number;
  radius: number;
};

function RippleEffect({ background, long }: Props) {
  const [drops, setDrops] = useState<WaterDrop[]>([]);
  const key = useRef(0);

  const waterDropContainer = useRef<HTMLSpanElement>(null);

  const removeWaterDrop = useCallback(() => {
    setTimeout(
      () => {
        setDrops((prev) => {
          if (prev.length === 1) {
            key.current = 0;
          }
          return prev.slice(1);
        });
      },
      long ? 2550 : 750,
    );
  }, [long]);

  const handleClick = useCallback(
    (e: PointerEvent) => {
      const btn = e.currentTarget;

      if (!(btn instanceof HTMLElement)) {
        return;
      }

      const width = btn.offsetWidth;
      const height = btn.offsetHeight;

      const rect = btn.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const distances = [
        Math.hypot(x, y),
        Math.hypot(width - x, y),
        Math.hypot(x, height - y),
        Math.hypot(width - x, height - y),
      ];

      const radius = Math.max(...distances);

      setDrops((prev) => [...prev, { id: key.current++, x, y, radius }]);
      removeWaterDrop();
    },
    [removeWaterDrop],
  );

  const isAdded = useRef(false);

  useEffect(() => {
    const container = waterDropContainer.current;
    if (container) {
      const btn = container.parentElement;
      if (btn) {
        if (!isAdded.current && styles.btn) {
          btn.classList.add(styles.btn);
          isAdded.current = true;
        }

        btn.addEventListener("click", handleClick);
        return () => {
          btn.removeEventListener("click", handleClick);
        };
      }
    }
  }, [handleClick]);

  return (
    <span ref={waterDropContainer} className={styles.btnWaterEffect}>
      {drops.map((drop) => (
        <span
          key={drop.id}
          className={`${long ? styles.long : styles.short} ${styles.waterDrop}`}
          style={{
            width: `${drop.radius * 2}px`,
            height: `${drop.radius * 2}px`,
            top: `${drop.y - drop.radius}px`,
            left: `${drop.x - drop.radius}px`,
            background: background || "white",
          }}
        />
      ))}
    </span>
  );
}
export default RippleEffect;
