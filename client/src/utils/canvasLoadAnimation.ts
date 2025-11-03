export const drawCircle = (
  canvas: HTMLCanvasElement | null,
  currentLoad: number
) => {
  if (canvas) {
    const context = canvas.getContext("2d");
    if (!context) return;

    const size = 200;
    const center = size / 2;
    const radius = 85;
    const lineWidth = 12;

    context.clearRect(0, 0, size, size);

    // Background circle
    context.fillStyle = "#f3f4f6";
    context.beginPath();
    context.arc(center, center, radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    // Progress arc
    context.lineWidth = lineWidth;
    context.lineCap = "round";

    if (currentLoad < 20) {
      context.strokeStyle = "#10b981";
    } else if (currentLoad < 40) {
      context.strokeStyle = "#3b82f6";
    } else if (currentLoad < 60) {
      context.strokeStyle = "#f59e0b";
    } else {
      context.strokeStyle = "#ef4444";
    }

    context.beginPath();
    context.arc(
      center,
      center,
      radius,
      Math.PI * 1.5,
      (Math.PI * 2 * currentLoad) / 100 + Math.PI * 1.5
    );
    context.stroke();

    // Center text
    context.fillStyle = "#1f2937";
    context.font = "bold 32px system-ui";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(`${Math.round(currentLoad)}%`, center, center);
  }
};
