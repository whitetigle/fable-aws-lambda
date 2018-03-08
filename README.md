## fable-aws-lambda
This repo is just a simple Proof of concept to make AWS lambda functions using Fable.

## Requirements

* [dotnet SDK](https://www.microsoft.com/net/download/core) 2.0 or higher
* [node.js](https://nodejs.org) 6.11 or higher
* A JS package manager: [yarn](https://yarnpkg.com) or [npm](http://npmjs.com/)
> npm comes bundled with node.js, but we recommend to use at least npm 5. If you have npm installed, you can upgrade it by running `npm install -g npm`.
Although is not a Fable requirement, on macOS and Linux you'll need [Mono](http://www.mono-project.com/) for other F# tooling like Paket or editor support.

## Build the app
> In the commands below, yarn is the tool of choice. If you want to use npm, just replace `yarn` by `npm` in the commands.

* Install JS dependencies: `yarn install`
* **Move to `src` folder**: `cd src`
* Install F# dependencies: `dotnet restore`
* Compile to main.js: `dotnet fable yarn-build`
* Compile to main.js + Uglify: `dotnet fable yarn-prod`

## Deploy to Aws Lambda
1 - Create a new AWS Lambda
2 - Select Node 6.10 Runtime
3 - Your handler should be called *index.handler* (it's the default name, and the name we assume in this project)
4 - copy and paste the contents of the main.js file to the lambda function code editor
5 - Save the code your copied in the lambda editor (CTRL+S should do the trick)
6 - Hit the Save button at the top of the page: it will update your lambda
7 - hit the test button and you should see the json displayed in the Execution result log or in your lambda code editor logs

## How it works?
The code from `App.fs` is transpiled to `main.js` using commonjs.
There is a handler function which is what we instructed AWS Lambda to use as a handler:

```f#
let handler(event, context) = 
    // do something...
```

AWS Lambda will wait for a call to context.succeed. 
This function is simply telling the system to stop when everything's ended well. 
It has one string parameter: the response when all goes well.

```f#
let handler(event, context) = 
    // set our callback 
    let awsCallback = context?succeed    
    // then use this callback in whatever function you want
    callMyFunctionAndOnSuccessCall !!awsCallback 
```

On error you also could use `context.error`

## Have fun!
Now you know how to make aws lambda functions using Fable. So grab your favorite code editor and try to have some fun with Fable and AWS Lambda.
Would you have any question, feel free to ask by adding an issue to this repo :thumbup:
