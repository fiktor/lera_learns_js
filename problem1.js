function IsLetter(c) {
  const code = c.charCodeAt(0);

  return ('A'.charCodeAt(0) <= code && code <= 'Z'.charCodeAt(0)) ||
      ('a'.charCodeAt(0) <= code && code <= 'z'.charCodeAt(0));
}

function IsNumber(c) {
  const code = c.charCodeAt(0);
  return '0'.charCodeAt(0) <= code && code <= '9'.charCodeAt(0);
}

function CheckEmailLera(email) {
  const l = email.length;
  let n;
  for (let i = 0; i < l; i++) {
    if (email[i] === '@') {
      n = i;
    }
  }
  for (let i = 0; i < n; i++) {
    if (!IsLetter(email[i]) && !IsNumber(email[i]) && email[i] !== '_' && email[i] !== '.') {
      return false;
    }
  }
  let m;
  for (i = n + 1; i < l && m === undefined; i++) {
    if (email[i] === '.') {
      m = i;
    }
  }
  if (m === undefined || m === n + 1 || m === l - 1) {
    return false;
  }
  for (i = n + 1; i < m; i++) {
    if (!IsLetter(email[i]) && !IsNumber(email[i]) && email[i] !== '_') {
      return false;
    }
  }
  for (i = m + 1; i < l; i++) {
    if (!IsLetter(email[i]) && !IsNumber(email[i]) && email[i] !== '_' && email[i] !== '.') {
      return false;
    }
  }
  for (i = n + 1; i < l; i++) {
    if (email[i] === '.') {
      m = i;
    }
  }
  for (i = m + 1; i < l; i++) {
    if (!IsLetter(email[i]) && !IsNumber(email[i])) {
      return false;
    }
  }
  console.log('f')
  return true;
}

function IsNameCharacter(c) {
  return IsLetter(c) || IsNumber(c) || c === '_';
}

function CheckEmailVictor(email) {
  let at_pos;
  for (let pos = 0; pos < email.length && at_pos === undefined; pos++) {
    const c = email[pos];
    if (c === '@') {
      at_pos = pos;
    } else if (!IsNameCharacter(c) && c !== '.') {
      return false;
    }
  }
  if (at_pos === undefined) {
    return false;
  }
  let n_parts = 1; // number of parts separated by '.' which have started.
  let part_length = 0; // length of the current part.
  let has_underscore = false; // whether current part has '_' in it.
  for (let pos = at_pos + 1; pos < email.length; pos++) {
    const c = email[pos];
    if (c === '.') {
      if (part_length === 0) {
        return false;
      }
      n_parts++;
      part_length = 0;
      has_underscore = false;
    } else {
      if (!IsNameCharacter(c)) {
        return false;
      }
      part_length++;
      if (c === '_') {
        has_underscore = true;
      }
    }
  }
  return n_parts >= 2 && part_length > 0 && !has_underscore;
}

function VerifyProblem1(check_email) {
  // This function verifies wether solution answer1 provided for problem 1 is
  // correct.
  const examples = [
      {email: "v_a_s_y.a@my.domain.name.com", answer: true},
      {email: "vasya", answer: false},
      {email: "vasya@gmail", answer: false},
      {email: "vasya@gmail.com", answer: true},
      {email: "vasya_.89.@gmail.com", answer: true},
      {email: "vasya_.89.@gmail..com", answer: false},
      {email: "va#ya@gmail.com", answer: false}];
  for (let i = 0; i < examples.length; i++) {
    const example = examples[i];
    const expected = example.answer;
    const actual = check_email(example.email);
    if (expected != actual) {
      console.log("Solution is not correct on example #" + i + ": '" + example.email + "'.");
      console.log("Expected anser: " + expected + "; actual: " + actual + ".");
      return false;
    }
  }
  console.log("Solution looks correct.");
  return true;
}

VerifyProblem1(CheckEmailLera);
VerifyProblem1(CheckEmailVictor);
