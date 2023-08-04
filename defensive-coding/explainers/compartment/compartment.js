import "ses";

lockdown();

const c = new Compartment({
    // try removing one of those and see what happens
    console, fetch
});

c.evaluate(`
    fetch('http://example.com').then(re=>console.log(re.status))
`)