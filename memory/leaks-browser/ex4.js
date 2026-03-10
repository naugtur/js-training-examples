const runBT = document.querySelector(".run");

class Model {
    constructor() {
        this.leak = Array(1000000).fill("lots of text ".repeat(100000));
    }
}
class Model1 extends Model {
  constructor() {
    super();
    this.foo = "is model1 leaking?";
  }
}

class Model2 extends Model {
  constructor() {
    super();
    this.foo = "is model2 leaking?";
  }
}

function mkButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  document.getElementById("wrapper").appendChild(button);
  return button;
}

const clickHandlerOutside = function (foo) {
  return function clickHandlerOutside(evt) {
    console.log(foo);
  };
};

runBT.addEventListener("click", function eventHandlerClosure1() {
  const model1 = new Model1();
  const model2 = new Model2();

  const runBT1 = mkButton("test1");
  const runBT2 = mkButton("test2");

  runBT1.addEventListener("click", function handlerDefinedInClosure(evt) {
    console.log(model1.foo);
  });
  runBT2.addEventListener("click", clickHandlerOutside(model2.foo));
});
