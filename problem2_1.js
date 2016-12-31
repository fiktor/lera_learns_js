function LeftRotate(str) {
  if (str.length === 0) {
    return str;
  }
  return str.substring(1) + str[0];
}
