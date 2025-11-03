import { HardDrive } from "lucide-react";

interface MemProps {
  data: {
    freeMem: number;
    totalMem: number;
    usedMem: number;
    memUsage: number;
  };
}

function Mem({ data }: MemProps) {
  const percent = Math.round((data.usedMem / data.totalMem) * 100);
  const usedGB = (data.usedMem / 1024 / 1024 / 1024).toFixed(1);
  const totalGB = (data.totalMem / 1024 / 1024 / 1024).toFixed(1);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-500 rounded-lg">
          <HardDrive className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Memory</h3>
          <p className="text-sm text-gray-600">
            {usedGB} GB / {totalGB} GB
          </p>
        </div>
      </div>

      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
            percent < 60
              ? "bg-gradient-to-r from-green-400 to-green-500"
              : percent < 80
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
              : "bg-gradient-to-r from-red-400 to-red-500"
          }`}
          style={{ width: `${percent}%` }}
        >
          <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <span className="text-2xl font-bold text-gray-800">{percent}%</span>
        <span className="text-sm text-gray-500">Used</span>
      </div>
    </div>
  );
}

export default Mem;
