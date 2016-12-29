function f(x) {
  if (x < 0) {
    throw "x should be positive!";
  }
  return x + 1;
}

console.log(f(3) == 4 && f(-1) == f(-2));
