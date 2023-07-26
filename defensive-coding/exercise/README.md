# Defensive Coding exercise

Hi! 

Imagine you've inherited a codebase written in JavaScript.

*We don't want to scare you, so this is not going to be an actual awful pile of legacy code. Just a small module that's not entirely realistic, but easier to grasp than a real project would be.*

See `usageExample.js` for a snippet showing how this module can be used.

Now imagine your module is running alongside some dependencies tha the rest of the app is pulling in. What if they're malicious? 👿

## The challenge: 
- defend your code from attacks one by one.
- you can only modify authz.js
- you can't change the logic of how it works
- it's legacy code, so no major rewrites! 

*Sidenote: you can defeat some of the attacks by changing names of some fields or refactoring to for loops, but where's the fun in that, right?*

`attacks/` folder contains all the attacks and it's a good idea to look at the one you are currently running to see what you're dealing with. 

We'll go step-by-step through the exercises, so you need to know how to run them. Numbers start at zero.

The easiest way is to run them with `npm test 0` where you pass the number of the attack you wish to run as an argument.  

If you feel more comfortable with a browser, you can serve the exercise folder from localhost and open `.testrunner.html`. For details on how to do it, see below.  



## Running examples in the browser

> Disclaimer: running npx causes a package to be installed and run. You need to trust the packages you use that way to the same extent you would if you made a fresh install. 

```
npx http-server -c-1
```
open your favorite browser and point it to localhost on the port you get 

