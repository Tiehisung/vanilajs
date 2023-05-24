function simplifyFraction(numerator, denominator) {
  let commonFactors = [];
  if (numerator < denominator) {
    for (let i = 1; i <= numerator; i++) {
      if (numerator % i === 0 && denominator % i === 0) {
        commonFactors.push(i);
      }
    }
  } else {
    for (let i = 1; i <= denominator; i++) {
      if (numerator % i === 0 && denominator % i === 0) {
        commonFactors.push(i);
      }
    }
  }
  if (!commonFactors) return numerator + "/" + denominator;
  let simpleNum = numerator / commonFactors[commonFactors.length - 1];
  let simpleDen = denominator / commonFactors[commonFactors.length - 1];
  if (simpleDen === 1) return simpleNum;
  return simpleNum + "/" + simpleDen;
}

console.log(simplifyFraction(150, 100));
