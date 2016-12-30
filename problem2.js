function IsDigit(c) {
  const code = c.charCodeAt(0);
  return '0'.charCodeAt(0) <= code && code <= '9'.charCodeAt(0);
}

function CheckProblemLera(problem) {
  const l = problem.length;

  let n = 0;
  let m = 0;
  for (let i = 0; i < l; i++) {
    if (problem[i] !== "+" && problem[i] !== "-" && problem[i] !== "(" &&
        problem[i] !== ")" && problem[i] !== " " && !IsDigit(problem[i])) {
      return false;
    }
    if (problem[i] == "(") {
      n++;
    }
    if (problem[i] == ")") {
      m++;
    }
  }

  if (m !== n) {
    return false;
  } 

  let pos_open = -1;
  let pos_closed = -1;
  for (let i = 0; i < n; i++) {
    for (pos_open++; problem[pos_open] !== '('; pos_open++) {
      // Do nothing
    }
    for (pos_closed++; problem[pos_closed] !== ')'; pos_closed++) {
      // Do nothing
    }
    if (pos_open > pos_closed) {
      return false;
    }
  }

  return true;
}

function CheckProblemVictor(problem) {
  let num_open_brackets = 0;
  let state = '(';
  // state:
  // * '(' --- we can expect anything we could expect after '('.
  // * '1' --- we can expect anything we could expect after '1'.
  // * ')' --- we can expect anything we could expect after ')'.

  for (let pos = 0; pos < problem.length; pos++) {
    let cur = problem[pos];
    if (cur === '(') {
      num_open_brackets++;
    } else if (cur === ')') {
      num_open_brackets--;
      if (num_open_brackets < 0) {
        return false;
      }
    }

    if (state === '(') {
      if (cur === ' ' || cur === '(') {
        state = '(';
      } else if (IsDigit(cur)) {
        state = '1';
      } else {
        return false;
      }
    } else {
      // state === ')' || state === '1'
      if (IsDigit(cur) && state === '1') {
        state = '1';
      } else if (cur === ' ' || cur === ')') {
        state = ')';
      } else if (cur === '+' || cur === '-') {
        state = '(';
      } else {
        return false;
      }
    }
  }
  return num_open_brackets === 0 && (state === '1' || state === ')');
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
    {input: '(1 + 3)) + ((4 + 7)', answer: false},
    {input: '(1 + )', answer: false},
    {input: ' + ', answer: false},
    {input: '', answer: false},
    {input: '1 + ()', answer: false},
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

CheckProblem2(CheckProblemVictor);
