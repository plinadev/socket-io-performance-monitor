import { useEffect, useRef } from "react";
import { drawCircle } from "../utils/canvasLoadAnimation";
import { Cpu as CpuIcon } from "lucide-react";

interface CpuProps {
  data: {
    cpuLoad: number;
  };
}

function Cpu({ data }: CpuProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawCircle(canvasRef.current, data.cpuLoad);
  }, [data.cpuLoad]);

  const getLoadStatus = (load: number) => {
    if (load < 40) return { text: "Normal", color: "text-green-600" };
    if (load < 70) return { text: "Moderate", color: "text-yellow-600" };
    return { text: "High", color: "text-red-600" };
  };

  const status = getLoadStatus(data.cpuLoad);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <CpuIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">CPU Load</h3>
            <p className={`text-sm font-medium ${status.color}`}>
              {status.text}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="w-32 h-32"
        />
      </div>
    </div>
  );
}

export default Cpu;
