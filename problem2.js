function IsNumber(c) {
  const code = c.charCodeAt(0);
  return '0'.charCodeAt(0) <= code && code <= '9'.charCodeAt(0);
}

function CheckProblem(problem) {
  const l = problem.length;
  for (let i = 0; i < l; i++) {
    if (problem[i] !== "+" && problem[i] !== "-" && problem[i] !== "(" && problem[i] !== ")" && problem[i] !== " " && !IsNumber(problem[i])) {
      return false;
    }
    let n = 0;
    let m = 0;
    for (let i = 0; i < l; i++) {
      if (problem[i] == "(") {
        n = i;    
      }
      if (problem[i] == ")") {
        m = i;
      }
      if (m !== n) {
        return false;
      }
    }
  }
}

function CheckProblem2(solution) {
  const examples = [
    {input: '1 + 3 - 4', answer: true},
    {input: '238rhqwioehfpioqh', answer: false},
    {input: '(1)', answer: true},
    {input: '((((((((((2))))))))))', answer: true},
    {input: '(((((((((2))))))))))', answer: false},
    {input: '((((((((((2)))))))))', answer: false},
    {input: '1 + 3) + (4 + 7', answer: false},
    {input: '(1 + 3) + (4 + 7)', answer: true},
    {input: '49       +      3', answer: true}];
  for (let i = 0; i < examples.length; i++) {
    const example = examples[i];
    const expected = example.answer;
    const actual = solution(example.input);
    if (expected !== actual) {
      console.log('Solution is not correct on example #' + i + ": '" +
          example.input + "'");
      console.log('Expected: ' + expected + '; actual: ' + actual + '.');
      return false;
    }
  }
  console.log('Solution looks correct.');
  return true;
}

CheckProblem2(CheckProblem);
