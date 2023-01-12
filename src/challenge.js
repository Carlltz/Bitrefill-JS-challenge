/*

  CHALLENGE:
  
  FORK this Pen. 

  Finish the "mustachify" function so that the console output should be something like:
  { duration: X,
    result: "A:Alpha, Y:xY, B:xB1 and xB2, Z:xZ C:xC1, xC2, xF1 and xF2 D:Delta."
    answeredCorrectly: true }

  When you're done, send in this CodePen to continue the process.

  You'll be evaluated on code quality and performance

*/

async function getData(key) {
  switch (key) {
    case "A":
      return "Alpha";
    case "BB":
      return "{{B1}} and {{B2}}";
    case "C":
      return "{{C1}}, {{C2}}, {{EE}}";
    case "DD":
      return "Delta";
    case "EE":
      return "{{F1}} and {{F2}}";
  }
  await new Promise((r) => {
    setTimeout(r, 1000);
  });
  return `x${key}`;
}

async function mustachify(input, callback) {
  while (input.match(/{{(.*?)}}/) != null) {
    // While there's still callback elements in input run code: (Takes nested callback elements into consideration)

    input = [input]; // Make input into an array
    while ((match = input[input.length - 1].match(/{{(.*?)}}/)) != null) {
      // Fill array with promises of callback elements: (Only one level deep, missing the nested callback elements)
      let lastElement = input.pop(); // Remove and save last element
      input.push(...lastElement.split(match[0])); // Spread last element, but split at the matched callback element
      input.splice(input.length - 1, 0, callback(match[1])); // Insert callback elements value
    }

    // Await all promises:
    await Promise.all(input).then((values) => {
      input = values;
    });

    // Make string of array. This makes it easier to check for callback elements and probably faster then checking through the whole array one element at a time
    input = input.join("");
  }
  return await input; // Returns input when no more matches is found.
}

async function run() {
  let startTime = Date.now();
  let result = await mustachify(`A:{{A}}, Y:{{Y}}, B:{{BB}}, Z:{{Z}} C:{{C}} D:{{DD}}.`, getData);
  let answeredCorrectly = result === "A:Alpha, Y:xY, B:xB1 and xB2, Z:xZ C:xC1, xC2, xF1 and xF2 D:Delta.";
  let duration = Date.now() - startTime;

  console.log({ duration, result, answeredCorrectly });
}

run();
