# Read me if you gave up trying to find the leak in the browser


## Ok, you really decided you need this :)

# Try continuing on your own after each clue!


### 1.
- Go to "Memory" tab and start recording allocation timeline.
- Stop it and then select a single spike of leftovers that didn't get collected.
- Look at the items with highest "retained size"
There's going to be an excess of information there. That's normal.

### 2.
- Keep digging until you find the field named somethingToLeak in the top panel (Constrictor)
- Click on it and see how it's retained in the bottom panel.


### 3.
- Note it's retained by handleResize - what can you do to fix that?


### 4.
- How are the two uses of useEffect in the file different?