export default function(toRound: number, roundingMultiple: number) {
  return Math.round(toRound / roundingMultiple) * roundingMultiple;
}
