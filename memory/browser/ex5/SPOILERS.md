# Read me if you gave up tryoing to find the leak in the browser


## Ok, you really decided you need this :)

BTW. this works in a generation of devtools available now - Fall of 2016 (Chromium 53), might change in the future...

# Try continuing on your own after every clue!

### 1.
- Go to profiles and start recording allocation timelines.
Click refresh a few times. Select a single spike of leftovers that didn't get collected.

- Look at the items with highest "retained size"



### 2.
- Open "Objects" on the list and open first reference.
- Notice it's a div react-specific element
- look at props, they will give you clues to what it is exactly
- Now you know what the content of the leak is. You need to find how it's retained.
- Click on the object reference and explore the panel below.


### 3.
- See how it says it's in an array inside of a bound argument of some function? That's the drawback of using functions without names.
- Hover over the function to see how it was defined.
- Congrats, you found the variable name that's a suspect!
- Now try exploring to see how it got retained



### 4.
- Can't find it? this is tricky - you're focusing on the wrong part of the tree here.
- Hide the "type" part of the tree and see that just below it there's "SomeComponent" listed.
- Now you know it's retained as an element that's bound to a function and it's inside of SomeComponent. That should be enough to kill it.
