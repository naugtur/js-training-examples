window.module = (() => {

    const collection = [];

    const wrapper = document.querySelector('#wrapper');


    return {
        run() {
            let i, d;
            for (i = 0; i < 1090; i++) {
                d = document.createElement('div');
                d.textContent = i;
                collection.push(d);
                wrapper.appendChild(d);
            }

        },
        clean() {
            wrapper.parentNode.removeChild(wrapper); //empty
        }
    }
})();
