export function generateCasePermutations(str:string) : string[] {
    if (str === '') {
      return [''];
    } else {
      const firstChar = str.charAt(0);
      const restOfString = str.slice(1);
      const permutations = generateCasePermutations(restOfString);
      const results = [];
  
      for (const permutation of permutations) {
        results.push(firstChar.toUpperCase() + permutation);
        results.push(firstChar.toLowerCase() + permutation);
      }
  
      return results;
    }
  }