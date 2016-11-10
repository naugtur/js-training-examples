var runBT = document.querySelector('.run')

runBT.addEventListener('click', function eventHandlerClosure() {
    var model1 = {
        leak1: Array(1000000).join("lots of text1"),
        foo: 'bar'
    }
    var obj = document.getElementById("wrapper");

    obj.addEventListener('click', function handlerDefinedInClosure(evt) {
        if (false) {
            model1.foo = 'baz'
        }
    });
})


runBT.addEventListener('click', function eventHandlerClosure() {
    var model2 = {
        leak2: Array(1000000).join("lots of text2"),
        foo: 'bar'
    }
    var obj = document.getElementById("wrapper");

    obj.addEventListener('click', clickHandler(model2.foo))
})


var clickHandler = function(foo){
  return function(evt) {
    if (false) {
        foo = 'baz'
    }
  }
};
