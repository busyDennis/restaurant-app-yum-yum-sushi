var questions = [
  "What is your race?",
  "What is your religion?",
  "Are you gay?"
];

var answers = [];

function ask(q_index) {
  process.stdout.write(`\n\n\n ${questions[q_index]}`);
  process.stdout.write("  >  ");
}

for(i = 0; i < questions.length; i++)
  ask(i);

// function grab(flag) {
//   var index = process.argv.indexOf(flag);
//   return (index === -1) ? null : process.argv[index + 1];
// }

// var greeting = grab('--greeting');

// if (! greeting)
//   console.log("Hey, don't u know me?");
// else
//   console.log(`Welcome ${greeting}`);