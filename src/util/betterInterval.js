// it's not perfect, yet but at least much better than setInterval

export function setBetterInterval(fn, duration) {
  let timeout;
  let startTime;
  let totalRuns = 0;

  function run() {
    clearTimeout(timeout);
    const now = Date.now();
    if (!startTime) {
      startTime = now;
    }

    fn();
    const nextRun = duration - (now - (startTime + totalRuns * duration));
    totalRuns++;

    timeout = setTimeout(() => run(), nextRun);
  }

  run();

  return {
    clear() {
      clearTimeout(timeout);
    }
  };
}
