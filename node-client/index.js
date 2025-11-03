const os = require("os");
const io = require("socket.io-client");
const socket = io("http://localhost:3000");
socket.on("connect", () => {
  const nI = os.networkInterfaces();
  let macA;
  for (let key in nI) {
    const isInternetFacing = !nI[key][0].internal;
    if (isInternetFacing) {
      macA = nI[key][0].mac;
      break;
    }
  }
  const perfDataInterval = setInterval(async () => {
    const perfData = await performanceLoadData();
    perfData.macA = macA;
    socket.emit("perfData", perfData);
  }, 1000);
});
const cpuAverage = () => {
  const cpus = os.cpus();

  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach((aCore) => {
    for (mode in aCore.times) {
      totalMs += aCore.times[mode];
    }
    idleMs += aCore.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
};

const getCpuLoad = () =>
  new Promise((resolve, reject) => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;
      const percentOfCpu = 100 - Math.floor((100 * idleDiff) / totalDiff);
      resolve(percentOfCpu);
    }, 100);
  });

const performanceLoadData = () =>
  new Promise(async (resolve, reject) => {
    const cpus = os.cpus();

    const totalMem = os.totalmem();

    const freeMem = os.freemem();

    //memory usage
    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;

    const osType = os.type();

    const upTime = os.uptime();

    const cpuType = cpus[0].model;
    const numCores = cpus.length;
    const cpuSpeed = cpus[0].speed;

    const cpuLoad = await getCpuLoad();

    resolve({
      freeMem,
      totalMem,
      usedMem,
      memUsage,
      osType,
      upTime,
      cpuType,
      numCores,
      cpuSpeed,
      cpuLoad,
    });
  });
