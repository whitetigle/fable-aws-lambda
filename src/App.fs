module FableAwsLambda

open Fable.Core
open Fable.Core.JsInterop
open Fable.PowerPack
open Fable.PowerPack.Fetch

JsInterop.importAll "isomorphic-fetch"

// fetch a Json and display it as the response of our Lambda function
let fetchJson ( awsCallback : string -> unit ) url =

    fetch url []
    |> Promise.bind (fun res -> res.text())
    |> Promise.map awsCallback
    
// This is the AWS lambda entry point
let handler(event, context) = 
    // for the sake of this proof of concept we just use dynamic typing for the succeed function
    let awsCallback = context?succeed    
    // let's get some json!
    "https://jsonplaceholder.typicode.com/comments?postId=1" |> fetchJson !!awsCallback // same here, we unbox the function
