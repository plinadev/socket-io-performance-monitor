import { useEffect, useState } from "react";
import socket from "./utils/socketConnection";
import type { PerformanceData } from "./types";
import Widget from "./components/Widget";

type PerformanceDataMap = Record<string, PerformanceData>;

function App() {
  const [performanceData, setPerformanceData] = useState<PerformanceDataMap>(
    {}
  );

  useEffect(() => {
    socket.on("perfData", (data: PerformanceData) => {
      setPerformanceData((prev) => ({
        ...prev,
        [data.macA ?? "unknown"]: data,
      }));
    });

    return () => {
      socket.off("perfData");
    };
  }, []);

  const widgets = Object.values(performanceData).map((d) => (
    <Widget data={d} key={d.macA ?? "unknown"} />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Performance Dashboard
        </h1>
        <p className="text-gray-600">Monitor your systems in real-time</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {widgets}
      </div>
    </div>
  );
}

export default App;
