# Preamble

I'm very excited to see that you have decided (or planning to decide) to join in on this effort and contribute code and/or design proposition or bug fixes to the **Radixx** project. Even if you can just spare a bit of time to correct a typo or help create a more elaborate documentation for Radixx, this will be highly appreciated. Once again, Welcome on board!

When requesting or submitting new features (via PRs), first consider whether it might be useful to others. Open
source projects are used by many developers, who may have entirely different needs to your own. Think about
whether or not your feature is likely to be used by other users of the project.

>Please feel free to modify existing code requests herein or add/suggest new code requests of your own (by adding them to this CONTRIBUTING.md file under The **Code Request** heading) and/or send in a pull request and open an issue (enhancement type) to thoroughly explain them. Thank You! 

## Procedure

Before filing an issue:

- Attempt to replicate the problem, to ensure that it wasn't a coincidental or isolated incident.
- Check to make sure your feature suggestion or bug notification isn't already present within the project.
- Check/Filter Through all pull requests to ensure that the bug doesn't have a fix in progress.
- Check/Filter Through all pull requests to ensure that the feature isn't already in progress.

Before submitting a pull request:

- Check the codebase to ensure that your feature doesn't already exist.
- Check the pull requests to ensure that another person hasn't already submitted the feature or fix.

## Code Requests

>Configure the manner in which the <q>dispacth</q> triggers the store callbacks.

- define **Radixx.onError(function: fn)** as part of _Radixx_ APIs as seen below:

>As at the upper version of **Radixx** (i.e. - v0.1.4). Whenever something goes wrong as a result of a type/syntax/range/reference error (mostly in the store callback or due to invalid action data type). Radixx always throw an error without trying to handle it. In subsequent versions, **Radixx** proposes to expose a proper error handler registration API to handle error conditions gracefully.

```js

	// below is the form of the implementation

	Radixx.onError(function(errorObject, callStack){
		
		switch(errorObject.name){
			case "RadixxTypeError":
			case "RadixxBatchError":
				console.error("MyApp: [Radixx] ", errorObject.message, errorObject, callStack);
			break;

			case "RadixxProcessError":
				console.warn("MyApp: [Radixx] ", errorObject.context, errorObject.message, callStack);
			break;

			default:
				throw errorObject;
			break;
		}

	});
```

- Detect places where memory leaks happen (based on benchmark and profiling results) or are likely to happen in the codebase and clean them up.

- Optimize <q>onDispatch</q> event not to fire only when any store data ACTUALLY changes by taking a simple diff of the state object and trigger store callbacks conditionally (trigger only when store state data changes - i.e. when there is a change/delta between the previous state and the new state)

- Build and Integrate support for GraphQL (if possible build in a small and efficient GraphQL client as part of Radixx) in an easy way

## Code Merge Requirements

If the project maintainer has any additional requirements, you will find them listed here.

- **Add tests!** - Your patch won't be accepted if it doesn't have tests. Please make use the _tests_ folder to include your **tests**.

- **Document any change in behaviour** - Make sure the `README.md` and any other relevant documentation are kept up-to-date.

- **Consider our release cycle** - We try to follow [SemVer v2.0.0](http://semver.org/). Randomly breaking public APIs is not an option.

- **One pull request per feature** - If you want to do more than one thing, send multiple pull requests.

- **Send coherent history** - Make sure each individual commit in your pull request is meaningful. If you had to make multiple intermediate commits while developing, please [squash them](http://www.git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Changing-Multiple-Commit-Messages) before submitting.

## Code Of Conduct

Please, be informed that open-source projects are for sharing and learning as well as helping others out with solving pertinent developer issues or challenges. By deciding to contribute to Radixx via PRs or Code Requests or Documentation Updates you also agree to be bound by the Code Of Conduct.

- That in the course of contrbuting ideas, addtional features (code) or bug fixes, you do so with mutual respect and decorum.
- You should not use foul, insensitive and/or offensive language in communicating on the issue tracker/board.
- Mansplaining is completely prohibited on the issue tracker/board and on gitter. Everyone should endeavour to keep things gender-neutral.
- Thanks for always cooperating.

**Happy coding**!
