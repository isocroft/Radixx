# Preamble

I'm very excited to see that you have decided (or planning to decide) to join in on this effort and contribute code and/or design proposition or bug fixes to the **Radixx** project. Even if you can just spare a bit of time to correct a typo or help create a more elaborate documentation for Radixx, this will be highly appreciated. Once again, Welcome on board! 

>Please feel free to modify existing code requests herein or add/suggest new code requests of your own (by adding them to this CONTRIBUTING.md file) and/or send in a pull request and open an issue (enhancement type) to thoroughly explain them. Thank You! 


## Code Requests

- add more configuration options for Radixx

```js

	Radixx.configure({
		universalCoverage:true /* make state available through every tab/window */
	})

```

>Configure the order in which the <q>dispacth</q> triggers the store callbacks.

- define **Radixx.onError(function: fn)** as part of _Radixx_ APIs as seen below:

>As at the current version of **Radixx** (i.e. - v0.1.0). Whenever something goes wrong as a result of a type/syntax/range/reference error (mostly in the store callback or due to invalid action data type). Radixx always throw an error without trying to handle it. In subsequent versions, **Radixx** proposes to expose a proper error handler registration API to handle error conditions gracefully.

```js

	// below is the form of the implementation

	Radixx.onError(function(errorObject){
		
		switch(errorObject.name){
			case "TypeError":
			case "ReferenceError":
			case "RangeError":
			case "SyntaxError":
				console.log("MyApp: ", errorObject.message, errorObject.stack);
			break;

			case "RadixxError":
				console.log("MyApp: [Radixx] ", errorObject.context, errorObject.message, errorObject.stack);
			break;
		}

	});
```

- Detect places where memory leaks happen (based on benchmark and profiling results) or are likely to happen in the codebase and clean them up.

- Optimize <q>onDispatch</q> event not to fire only when any store data ACTUALLY changes by taking a simple diff of the state object and trigger store callbacks conditionally (trigger only when store state data changes - i.e. when there is a change/delta between the previous state and the new state)

- Implement a way to enable store data accessible across windows/tabs by making it possible to propagate store change events across windows/tabs using [localStorage] events

- Build and Integrate support for GraphQL (if possible build in a small and efficient GraphQL client as part of Radixx) in an easy way

- Add _bower_ and _yarn_ package manager support


## Code Of Conduct

Please, be informed that open-source projects are for sharing and learning as well as helping other out with ...
