window.module = (() => {

    let last = document.querySelector('#wrapper');


    return {
        run() {
            let i, d;
            for (i = 0; i < 1000; i++) {
                d = document.createElement('div');
                d.textContent = i;

                last.appendChild(d);
                last = d;
            }

            d = document.createElement('span');
            d.textContent = 'last in tree';

            last.appendChild(d);
            last = d;

        },
        clean() {
            const wrapper = document.querySelector('#wrapper');
            wrapper.parentNode.removeChild(wrapper); //empty
        },
        realClean() {
            const wrapper = document.querySelector('#wrapper');
            if (wrapper) {
                wrapper.parentNode.removeChild(wrapper); //empty
            }
            last = null;
        }
    }
})();
