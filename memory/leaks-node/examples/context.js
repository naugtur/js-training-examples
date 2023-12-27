let recent;

function progrm() {
  const previous = recent;
  recent = {
    list: "LOL ".repeat(1000000),
    seeminglyIrrelevantFunction() {
      // this does nothing, but is enough to prevent v8 optimizing away the function
      if (false) {
        previous++;
      }
    },
  };
}

setInterval(() => {
  progrm();
}, 200);
