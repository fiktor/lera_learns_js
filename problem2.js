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
    var n = 0;
    var m = 0;
    for (let i = 0; i < l; i++) {
      if (problem[i] == "(") {
        n = n+1;
        
      }
    }
    for (let i = 0; i < l; i++) {
      if (problem[i] == ")") {
        m = m+1;
        
      }
    }
      
      
    
    
   if (m !== n) {
        return false;
    } 
      
      
    for (let i = 0; i < l; i++) {
      if (problem[i] == "(") {
        n = i;
          console.log(i);
       for (let j = 0; j < l; j++) {
         if (problem[j] == ")") {
             m = j;
             console.log(j);
         }
       }
          if (n < m) {
              return true;
          }
          return false;
      }
    }
  }
    
    return true;
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
