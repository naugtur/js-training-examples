window.module = (function () {
  let last = document.querySelector("#wrapper");

  return {
    run() {
      let d;
      for (let k = 0; k < 10; k++) {
        for (let i = 0; i < 10000; i++) {
          d = document.createElement("span");
          d.textContent = i;

          last.appendChild(d);
        }
        last = d;

        d = document.createElement("div");
        d.textContent = " level in tree ";
        d.style = "border: 1px solid red; padding: 5px; margin: 5px;";

        last.appendChild(d);
        last = d;
      }
      // name your functions to make leak searching easier
      window.addEventListener("unload", function someFunction() {
        console.log(d);
        //Note: browsers sometimes remove references from function context if they are not used inside the function. But you shouldn't bet on that...
      });
    },
    clean() {
      const wrapper = document.querySelector("#wrapper");
      wrapper.parentNode.removeChild(wrapper); //empty
      last = null;
    },
  };
})();
