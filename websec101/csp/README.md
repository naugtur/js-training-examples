# CSP-exercise

## Setup
```
npm ci --ignore-scripts
```

## Run
```
npm start
```
Open [http://localhost:1337/](http://localhost:1337/)

Edit headers.json only for this exercise.

## 1. Gentle rollout of CSP

Go through the procedure of rolling out a CSP. Start with `default-src 'none'`, add reporting and then open it up based on reports

Without reading any code in `/public` open the main page to see how it works and then roll out a CSP without breaking the script that displays the cat picture. Iterate on the policy and look at the reports logged by the server.

## 2. More precise CSP

Now go to the page with user posts (xss.html) and try to block alerts from user posts while the 2 initial alerts from the page are allowed.

## 3. Defend from data theft / password exfiltration

- start the server with the data theft script enabled
```
npm run datatheft
```
- open the main page
- open network tab in devtools
- fill in the login form and see the data theft happen
- try narrowing down the CSP to block all data theft attempts

# Credit where it's due

The data theft example is inspired by [https://david-gilbertson.medium.com/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5](https://david-gilbertson.medium.com/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5)
