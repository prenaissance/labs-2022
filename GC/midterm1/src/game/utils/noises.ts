const median = 0.5;
const stdDev = 0.1;
const gaussian = (x: number) => {
  return (
    (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
    Math.exp(-Math.pow(x - median, 2) / (2 * Math.pow(stdDev, 2)))
  );
};

export { gaussian };
