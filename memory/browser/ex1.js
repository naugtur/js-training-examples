var module = (function () {

    var collection = [];

    var wrapper = document.querySelector('#wrapper');


    return {
        run: function () {
            for (var i = 0; i < 100; i++) {
                var d = document.createElement('div');
                d.textContent = i;
                collection.push(d);
                wrapper.appendChild(d);
            }

        },
        clean: function () {
            wrapper.parentNode.removeChild(wrapper); //empty
        }
    }
})();
