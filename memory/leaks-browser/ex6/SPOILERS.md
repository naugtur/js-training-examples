# Read me if you gave up trying to find the leak in the browser


## Ok, you really decided you need this :)

# Try continuing on your own after each clue!


### 1.
- Go to "Memory" tab and start recording allocation timeline.
- Click refresh a few times. Select a single spike of leftovers that didn't get collected.
- Look at the items with highest "retained size"
There's going to be an excess of information there. That's normal.

### 2.
- Look for what could be a react-specific element representing your component and check how it's retained


### 3.
- Have you found the array? Why is it called bound_argument_0?

### 4.
- hover over bound argument and look at the binding details in the dialog that pops up. It's the only place you'll find "catchMeIfYouCan" at the time of writing this doc.