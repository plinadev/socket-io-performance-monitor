import type { PerformanceData } from "../types";
import Cpu from "./Cpu";
import Info from "./Info";
import Mem from "./Mem";
import socket from "../utils/socketConnection";
import { useEffect, useState } from "react";

function Widget({ data }: { data: PerformanceData }) {
  const [isAlive, setIsAlive] = useState<boolean>(true);
  const cpuData = { cpuLoad: data.cpuLoad };
  const memData = {
    freeMem: data.freeMem,
    totalMem: data.totalMem,
    usedMem: data.usedMem,
    memUsage: data.memUsage,
  };
  const infoData = {
    macA: data.macA,
    osType: data.osType,
    upTime: data.upTime,
    cpuType: data.cpuType,
    cpuSpeed: data.cpuSpeed,
    numCores: data.numCores,
  };

  useEffect(() => {
    socket.on(
      "connectedOrNot",
      ({ isAlive, machineMacA }: { isAlive: boolean; machineMacA: string }) => {
        if (machineMacA === data.macA) {
          setIsAlive(isAlive);
        }
      }
    );
  }, [data.macA]);
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="mb-6 ">
        <div className="flex gap-5 items-center">
          {isAlive ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ">
              Online
            </span>
          ) : (
            <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm">
              Offline
            </span>
          )}
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {data.macA ? `Machine ${data.macA}` : "System Monitor"}
          </h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">Real-time performance</p>
      </div>

      <div className="space-y-4">
        <Cpu data={cpuData} />
        <Mem data={memData} />
        <Info data={infoData} />
      </div>
    </div>
  );
}
export default Widget;
