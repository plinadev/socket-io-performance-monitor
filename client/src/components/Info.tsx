import { Clock, Cpu, Monitor, Zap } from "lucide-react";
import { formatUptime } from "../utils/formatUptime";

function Info({
  data,
}: {
  data: {
    macA?: string;
    osType: string;
    upTime: string;
    cpuType: string;
    cpuSpeed: number;
    numCores: number;
  };
}) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gray-700 rounded-lg">
          <Monitor className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">System Info</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-gray-200">
          <span className="text-sm text-gray-600 flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            OS
          </span>
          <span className="text-sm font-medium text-gray-800">
            {data.osType}
          </span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-200">
          <span className="text-sm text-gray-600 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Uptime
          </span>
          <span className="text-sm font-medium text-gray-800">
            {formatUptime(data.upTime)}
          </span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-200">
          <span className="text-sm text-gray-600 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Processor
          </span>
          <span className="text-sm font-medium text-gray-800 text-right max-w-[60%] truncate">
            {data.cpuType}
          </span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-200">
          <span className="text-sm text-gray-600">Cores</span>
          <span className="text-sm font-medium text-gray-800">
            {data.numCores}
          </span>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-600 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Speed
          </span>
          <span className="text-sm font-medium text-gray-800">
            {data.cpuSpeed} MHz
          </span>
        </div>
      </div>
    </div>
  );
}

export default Info;
