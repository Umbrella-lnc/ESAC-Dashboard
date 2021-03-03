export function fac(x: number): number {
  if (x == 0) return 1;
  else if (x < 0) return -1;
  else return x * fac(x - 1);
}
