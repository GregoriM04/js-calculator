# A calculator

Using JavaScript to do simple calculations.

![Picture](/assets/images/screenshot.jpeg)

This project required me to understand and better implement available tools on JavaScript in order to achieve the goal of doing some basic calculations. 

I first considered the ***JavaScript Math() Object*** to perform the task. However, it turned out to be more specific than I first imagined. So, I went the other way and completed everything using hand-made functions.

Issues to be addressed:
1. Follow the mathematical operation hierarchy.
2. Calculate a given expression (string) correctly.
3. Show as many digits as possible.
4. Change signs when the user requires it.
5. Do not allow the addition of consecutive division and multiplication signs.

The first two were resolved simultaneously with a single function after a lot of research on how to properly handle a given expression (a string) and operate them using the correct hierarchy method. Here's a short snip:

```js 
function calculate(expression) {
  let parts = expression.match(/(?:\-?[\d\.]+)|[-\+\*\/]|\s+/g);
  let nums = parts.map(parseFloat);
  .
  .
  .
  for (let i = 0; i < parts.length; i++) {
    if (nums[i] === nums[i]) {
      processed.push(nums[i]);
    } else {
      switch (parts[i]) {
        case "+":
          continue; //ignore
        case "-":
          processed.push(nums[++i] * -1);
          break;
          .
          .
          .
      }
    }
  }
  return processed.reduce(function (result, elem) {
    return result + elem;
  });
}
```

The other three mayor issues were a headache to overcome, but it was because the calculator showed the user the current expression every time it pressed an input. So, after thinking about it for several hours and using a couple of functions, I managed to make it work.

Finally, this project took longer than expected because I wanted to be sure I was doing it correctly and implementing the tools available in vanilla JavaScrip well.

Here's a link to the [live site](https://gregorim04.github.io/js-calculator/).

Ps: I know there are some flaws in this app, which, when solved, will make it better. However, I expect more experience and free time to do it or receive feedback on how to do it.