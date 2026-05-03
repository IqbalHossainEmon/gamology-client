import { useCallback } from "react";

const useCalculateTextSize = () =>
  useCallback(
    (val: string, font: `${number}${string} ${string}` = "1rem Inter") => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) throw new Error("Failed to get canvas context");

      context.font = font;
      const { width } = context.measureText(val);
      return width;
    },
    [],
  );

export default useCalculateTextSize;
