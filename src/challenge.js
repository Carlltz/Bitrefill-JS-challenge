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
  // TODO: FINISH THIS FUNCTION

  while ((match = input.match(/{{(.*?)}}/)) != null) {
    input = input.replace(match[0], await callback(match[1]));
  }
  return input;
}

async function run() {
  let startTime = Date.now();
  let result = await mustachify(`A:{{A}}, Y:{{Y}}, B:{{BB}}, Z:{{Z}} C:{{C}} D:{{DD}}.`, getData);
  let answeredCorrectly = result === "A:Alpha, Y:xY, B:xB1 and xB2, Z:xZ C:xC1, xC2, xF1 and xF2 D:Delta.";
  let duration = Date.now() - startTime;

  console.log({ duration, result, answeredCorrectly });
}

run();
