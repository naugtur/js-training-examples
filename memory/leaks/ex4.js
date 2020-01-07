const runBT = document.querySelector('.run')

runBT.addEventListener('click', function eventHandlerClosure1() {
    const model1 = {
        leak1: Array(1000000).join("lots of text1"),
        foo: 'bar'
    }
    document.getElementById("wrapper")
        .addEventListener('click', function handlerDefinedInClosure(evt) {
            if (false) {
                model1.foo = 'baz'
            }
        });
})


const clickHandlerOutside = function (foo) {
    return function (evt) {
        if (false) {
            foo = 'baz'
        }
    }
};

runBT.addEventListener('click', function eventHandlerClosure2() {
    const model2 = {
        leak2: Array(1000000).join("lots of text2"),
        foo: 'bar'
    }
    document.getElementById("wrapper")
        .addEventListener('click', clickHandlerOutside(model2.foo))
})


