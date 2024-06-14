## Trampolines tutorial


What if you have a complex implementation of some logic that you need to feed data from various sources and it needs to be synchronous or async depending on where you use?
Should you duplicate the logic? Should you split the logic into many small functions? what if there's a complex set of conditions?

Implement `crawlAndProcessSync` and `crawlAndProcessAsync` in `crawler.js` without duplicating the main crawling implementation and making significant changes to the body of the `crawlAndProcess` function.

![](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmJ6NHAwMHVpdm5ycGVzNDhnemR1NWlnNzBqMGZnd2J3aXlqbjM0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n4FpwV0JxhYjtBjn4U/giphy.gif)

### Tips

Train of thought
- The key idea: We need to outsource awaiting or not awaiting to the Sync/Async functions from `crawlAndProcess`.
- The logic still has to stop when something potentially asynchronous is run.
- What other primitive do we know that can pause execution mid-function?
- Yes, that's the starting point. Now implement wrappers on the outside of the function.


Let me guess, you broke recursion? You need to forward all values from it, not only the first one.

