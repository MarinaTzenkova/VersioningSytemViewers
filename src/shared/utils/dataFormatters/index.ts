export default {
  getExponential: function(c: number) {
    const arr = c.toExponential(2).split("e+");
    return `${arr[0]} x 10${parseInt(arr[1])
      .toString()
      .sup()}`;
  },
  getColonySize: function(s: number, sd: number) {
    if (s === undefined || sd === undefined) return "missing";
    if (s && sd)
      return `${this.getExponential(s)} ± ${this.getExponential(sd)} μm²`;
    else return `${s} ± ${sd} μm²`;
  },
  getColonyCircularity: function(c: number, sd: number) {
    if (c === undefined || sd === undefined) return "missing";
    return `${c.toFixed(2)} ± ${sd.toFixed(2)}`;
  },
  getScratchArea: function(c: number) {
    if (c) return this.getExponential(c) + " μm²";
    else return c;
  },
  getScratchSpeed: function(c: number) {
    if (c) return this.getExponential(c) + " μm²/s";
    else return c;
  }
};
