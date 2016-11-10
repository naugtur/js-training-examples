var module = (function () {

    var last = document.querySelector('#wrapper');


    return {
        run: function () {
            for (var i = 0; i < 1000; i++) {
                var d = document.createElement('div');
                d.textContent = i;

                last.appendChild(d);
                last = d;
            }

            d = document.createElement('span');
            d.textContent = 'last in tree';
                                                // name your functions to make leak searching easier
            window.addEventListener('unload', function someFunction() {
                console.log(i, d);
                //Note: browsers remove references from function context if they are not used inside the function. But you shouldn't bet on that...
            })

            last.appendChild(d);
            last = d;

        },
        clean: function () {
            var wrapper = document.querySelector('#wrapper');
            wrapper.parentNode.removeChild(wrapper); //empty
            last = null;
        }
    }
})();
