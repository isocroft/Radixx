# Radixx

This is a simple Javascript library that implements the **Facebook Flux Architecture** with a twist to how the entire application state is managed and changed/updated. It resembles **Redux** in a lot of ways. 

## How to Use (Vanilla JS)

- First, download/install it from **NPM**

[NPM][npm-url]
   
[Download][downloads-url]

```bash

	$ npm install radixx
```

- Next, use it in your JavaScript application like so 

```html
<!DOCTYPE html>
<html>
<head>
	<title>Radixx - Example App</title>
	<script type="text/javascript">
	;(function(w, r){
		r.onDispatch(function(app_state){
			/* fired when all synchronous/asynchronous 
				mutations are completely done on the state */
			console.log(JSON.stringify(app_state)); 
		});

		var registeredStores = [];
		
		/* creating an action - multiple actions can be created for a real-life application */
		w.action = r.createAction({loadTodos:'LOAD_TODOS',saveTodo:'SAVE_TODO'});
		
		/* creating a store - multiple stores can be created for a real-life application */
		/* there's a strict structure to how to define a store callback - MUST always return area.put(); - as calling the put() method this way triggeres all change listeners */
		w.store = r.createStore('todos', function(action, area){
						var todos; 
						switch(action.actionType){
							case 'LOAD_TODOS':
								// action.actionData MUST be an array as seen
								// from the action.loadTodos([ ... ]) call below
								todos = action.actionData;
							break;
							case 'SAVE_TODO':
								// area.get() is used to retrieve current state for this store
								todos = area.get();
								todos.push(action.actionData);
							break;
							default:
								return null;
							break;
						}

						// area.put() is used to write/insert a new state into the store
						return area.put(todos);
		}, []);

		// setup a function to listen for change to the store
		store.setChangeListener(function(){
			// the this reference in here is the store itself
			alert("STORE AFFECTED: " + this.getTitle());
		});

		// do something with each store created
		r.eachStore(function(store, next){
			// get the title of the store and push into an array
			registeredStores.push(store.getTitle());
			// move to the next store that has been created and do same as above with it
			next();
		});

		// swapping the store callback with a new one
		store.swapCallback(function(action, area){
				var todos; 
				switch(action.actionType){
					case 'LOAD_TODOS':
						todos = action.actionData;
						/* 
							setting up the format the state data should be stored before
							it is put in storage.
						*/ 
						todos.toJSON = function(){
							return this.map(function(val){
								var todoTimeToDueDate = (new Date*1);
								return {
										is_overdue:todoTimeToDueDate > val.due_date_timestamp,
										todo:val
								};
							});
						};
					break;
					default:
						return null;
					break;
				}

				return area.put(todos);
		});

		console.log("stores registered: ", registeredStores.toString(), registeredStores.length);
	}(this, this.Radixx));	
	</script>
</head>
<body>
	<ul id="todos"></ul>
	<button type="button" disabled="disabled" id="undo-btn">UNDO</button>

	<script type="text/javascript">
		;(function(w, d){

			// calling an action - an action triggers changes in the store (by extension the application state)
			action.loadTodos([
				{
					text:'Buy flowers for my wife!', 
					completed:true,
					due_date_timestamp:1491144056023
				},
				{
					text:'Write that website re-design proposal',
					completed:false,
					due_date_timestamp:1491144702573
				}
			]);

			var mount_point = d.getElementById("todos");
			var button = d.getElementById("undo-btn");
			
			function render(m){
					var list = w.store.getState();
					var li = null;

					if(list.length == 0){
						m.innerHTML = "";
						return;
					}

					list.forEach(function(item, i){
						li = d.createElement("li");
						li.setAttribute("data-key", i);
						li.setAttribute("data-todo-overdue", item.is_overdue);
						li.setAttribute("data-todo-done", String(item.todo.completed));
						li.appendChild(d.createTextNode(item.todo.text));
						m.appendChild(li);
					});
			}		

			button.disabled = !w.store.canUndo();
			button.onclick = function(e){
				// undo application state changes
				w.store.undo();
				this.disabled = !w.store.canUndo();
				render(mount_point);
			};

			render(mount_point);

		}(this, this.document));
	</script>
</body>
</html>
```


## Radixx APIs

These are methods defined on the global **Radixx** object

- **Radixx.createAction(** _Object_ actionTagMap **)**

> Used to create an action creators (in Flux Architecture parlance). An object literal having the action method names (as key) and the action tag (as value) is passed into this api method.

- **Radixx.createStore(** _String_ storeTitle, _Function_ storeCallback [, _Array|Object_ initialStoreState] **)**

> Used to create a store to which action will be sent using action creators

- **Radixx.onDispatch(** _Function_ dispatchListener **)**

> Registers a function that is called whenever an action is disptached to the Hub (also called the `Dispatcher` in Flux Architecture parlance)

- **Radixx.eachStore(** _Function_ storeIterator **)**

> Used to call a function on each store created by Radixx and perform some operation on that store (operation is defined with the storeIterator)



## Store APIs

These are methods defined on the store object from **Radixx.createStore( ... )** call

- **store.hydrate(** _Array|Object_ initialStoreData **)**

> Used to put data and/or state into the store directly without using an action. This call affects only the store in question. actions however, affect all stores in the web application

- **store.getTitle(** _void_ **)**

> Used to retrieve the storeTitle used in creating the store

- **store.getState(** _void|String_ stateKey **)**

> Used to retrieve the current state of the store

- **store.setChangeListener(** _Function_ changeListener **)**

> Used to register a listener (callback) that is called whenever the state of the store changes

- **store.unsetChangeListener(** _Function_ changeListener **)**

> Used to unregister a listener (callback)

- **store.undo(** _void_ **)**

> Used to undo a state change to the store

- **store.redo(** _void_ **)**

> Used to redo a state change to the store

- **store.swapCallback(** _Function_ newStoreCallback **)**

> Used to swap/replace a store callback

- **store.destroy(** _void_ **)**

> Used to remove store state data from sessionStorage (manually)

- **store.disconnect(** _void_ **)**

## Features

- Finite Undo/Redo (cos we have got to have trade-offs - Performance suffers if you have infinite undo/redo as application state grows bigger)
- Use of Mixins for ReactJS and VueJS (even though most people think _mixins_ are dead and composition should be the only thing in used, i think mixins still have a place)
- Can replace the store callback (similar to **replaceReducer()** in _Redux_)
- An extended Loose Coupling between Radixx Dispatcher and Controllers/Components.
- Configure the order in which the <q>dispacth</q> triggers the store callbacks.
- A transparent way in separating mutation and asynchronousity in application state.
- No need to **<q>emit</q>** change events from within a store registration callback.
- No elaborate definition for **Action Creators** &amp; **Stores** (Write less code).
- No need to use immutableJS library to help manage application state changes.
- The **Dispatcher** object is hidden and all you have is a **<q>Hub</q>** object.
- Includes an **<q>onDispatch</q>** event that exposes the entire application state.

## Benefits

- Use with Single Page App Frameworks/Libraries e.g. VueJS 1.x/2.x, AngularJS 1.x, Angular 2.x, Ractive, React
- Use with Multi Page App Frameworks as well e.g jQuery, Jollof, Pheonix, Laravel, Flask, AdonisJS (application state persists across page loads/reloads)

## Best Practices (Dos and Don'ts)

- Application UI State {a.k.a Volatile Data} -- **can't store** this in Radixx (Text Input - being entered, Animation Tween Properties/Values, Scroll Position Values, Text Box Caret Position, Mouse Position Values, Unserializable State - like functions)
- Application Data State {a.k.a Non-Volatile Data} -- **can store** this in Radixx (Lists for Render fetched from API endpoints, any piece of Data displayed on the View)

> NOTE: When using Radixx with ReactJS, it is best to ascribe/delegate Application UI State to {this.state} and {this.setState(...)} and Application Domain Data State to {this.props} and {properties={...}} respectively. One reason why Radixx recommends this approach is to avoid confusion as to when {this.setState} calls actually update both the DOM and {this.state} since {this.setState} is _asynchronous_ in the way it operates.


## About Redux (with respect to Radixx)

Hers's how **Redux** is simply described

> Redux is basically event-sourcing where there is a single projection to consume (the application state).

Someone had this to say about the state of **Redux** single store

> I'm also not impressed about every action having to go “all the way” upwards (to the central store) instead of short-circuiting somewhere.

That being said, here is a round-up of what makes **Redux** a GREAT tool (for some use cases) and what doesn't make it so ideal (for all use cases)

# Gains of Redux single store

- Infinte Undo/Redo + Live-Editing Time Travel (As application state is immutable).
- Predictable Atomic Operation on Application state object (As actions are run in a specific predictable order).
- Single source of truth (No Guesswork!!) for applicaton state.

# Troubles with Redux single store

- A sizable amount of boilerplate code (especially with **connect()** and/or **mapStateToProps()** from _react-redux_ project) is required to get Redux up and running.
- Dynamically structured state is impossible. (mature, complex apps need this the most).
- Increased probability of state key(s) collisions between reducers (very likely in a big complex web app but highly unlikely in samll ones).
- Global variables are always a bad thing (This applies to the composition of the Redux application state itself) as you could `clobber` them unknowingly.
- Performance suffers as your state tree gets larger (Immutability is a good thing...sometimes).
- Each time the **connect()** decorator is called, it pulls in the entire application state (when using _react-redux_).


_Your best bet in all these is to choose the trade-offs wisely (depending on the peculiarities of the web app you're building)_. In order words, Choose what you can live with and what you can't live without


> NOTE: **Radixx** is not an outright drop-in replacement for **Redux** but a nice alternative when **Redux** doesn't quite fit your use case.


## Examples

>VueJS 1.x/2.x

```js

	var action = Radixx.createAction({'addStuff':'ADD_STUFF'});

	var store = Radixx.createStore('stuffs', function(action, area){
			var stuffs;
			switch(action.actionType){
				case 'ADD_STUFF':
					stuffs = area.get();
					if(action.actionKey){
						stuffs[action.actionKey] = action.actionData;
					}
				break;
				default:
					return null;
				break;
			}

			return area.put(stuffs);
	}, {
		firstName:'',
		lastName:'',
		text:'okay!'
	});

	// Vue Component defined with lifecycle hooks

	var MyVueComponent = Vue.extend({
			name:'radixx-powered',
			mixins:[store.vuejs.mixins],
			prop:['gender'],
			template:'<div><p>{{fullName}}</p>'+
			'<input type="text" v-model="text">'+
			'<button v-on:click="add">ADD</button></div>',
			computed:{
				fullName:function(){
					return this.firstName + ' ' + this.lastName;
				}
			},
			beforeCreate:function(){
				// for an advanced app, an ajax call may come in here ...

				/* 	
					from an ajax call response, if an empty object literal was passed to
					`Radixx.createStore` call (above), then, we can call `hydrate` on the
					store object here passing it the requisite data from the ajax response

					store.hydrate( ajaxResponseData );
				*/
			},
			mounted:function(){

				// code here...
			},
			beforeUpdate:function(){

				// code here...
			},
			methods:{
				add:function(){

					/* 
						calling an action to write data into our store
						and trigger an update on the view, here we are
						writing to `firstName` with a value of `this.text`

					*/
					action.addStuff(this.text, 'firstName');
				}
			},
			destroyed:function(){

				// code here...
			}
	});

	var app = new Vue({
			el:'#app',
			components:{
				MyComponent:MyVueComponent
			},
			template:'<my-component gender="male"></my-component>'
	});

```

>AngularJS 1.x

```js

// Top-level Module { Using the Angular 1.x Provider Helper - $ngRadixx }

angular.module("appy", [ 
			'ui.router',
			'appy.todos'
])
.config(['$stateProvider', '$urlRouterProvider', '$ngRadixProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $ngRadixxProvider, $locationProvider){

		$locationProvider.html5Mode(true);

		$stateProvider

		.state({
			url: '/',
			template: '<site></site>'
		})

		.state({
			url: '/user',
			template: '<app></app>',
			controller:'TodoCtrl'
		});

		$urlRouterProvider.otherwise('/');

		$ngRadixxProvider.configure({
			
		});
});


// Domain-level Module

angular.module("appy.todos", [
			'ngRadixx',
			'ngSanitize',
			'pouchdb' /* using [angular-pouchdb] module */
])

.factory("$todoAction", ['$ngRadixx',

	function($ngRadixx){

	var action_c_mappings = {
		'loadTodos':'LOAD_TODOS',
		'addTodo':'ADD_TODO',
		'removeTodo':'REMOVE_TODO'
	};
	
	/* create an action object with all necessary action names */
	return $ngRadixx.createAction(
		action_c_mappings
	);
}) 

.factory("$todoStore", ['$ngRadixx',

	function($ngRadixx){

	function register(action, area){
		var todos;
		switch(action.actionType){
			case 'ADD_TODO':
				todos = area.get();
				todos.push(action.actionData);
			break;
			case 'LOAD_TODOS':
				todos = action.actionData;
			break;
			case 'REMOVE_TODO':
				todos = area.get();
				todos.splice(action.actionData, 1);
			break;
			default:
				return null;
			break;
		};

		return area.put(todos);
	};
	
	return $ngRadixx.createStore(
		'todos',
		register,
		[]
	);
}) 

.factory('$fetch', ['$http', '$q', 'pouchDB', function($http, $q, pouchDB){
	
	return: {
		getTodos:function(url){
			var localdb = pouchDB('todos');
			return localdb.allDocs({
				include_docs:true,
				attachments:true
			}).then(function(res){
				return res.rows.map(function(row){
					return row.doc;
				});
			}).catch(function(err){
				if(err.name != 'conflict'){ 
					return $http.get(url);
				}else{
					if(err.name == 'not_found'){
						return [err];
					}	
				}
			});
		}	
	}
}]);

.controller("TodoCtrl", ['$scope', '$todoAction', '$todoStore', 'pouchDB', '$fetch'
	function($scope, $todoActions, $todoStore, pouchDB, $fetch){

		// get the 'title' for the {todos} store (a part of the application state)
		var title = $todoStore.getTitle(), 

		listen = (function(db){

				return function(){
					var data = this.getState();
					data._id = (new Date*1);
					
					/* store change listeners stores data in local DB */	
					db.put(data) 
					.then(function(res){

						/* Assuming to use the Pusher Realtime backend service */ 
						if(res.ok){
							return $http({
								url:'http://localhost:3248/broadcast/pusher',
								method:'POST',
								data:data
							}); 
						}else{
							throw new Error("Not OK => id:"+res.id+", rev:"+res.rev);
						}
					})
					.catch(function(err){ 
							console.log('App Error: ', err);
					});
				};

		}(pouchDB('todos')));


		/* loading todos from server DB (or local DB) */
		$fetch.getTodos('http://localhost:4002/todos/all').then(function(data){

			/* 
				calling hydrate() on a store affects only that store as
				opposed to triggering an action which affects all stores

				Here: we're triggering an action
			*/

			// $todoStore.hydrate(data.response);
			$todoAction.loadTodos(data.response);
		});

		$scope.$on('locationChangeSuccess', function(event, data){

			/* subscribe store change listener */
			$todoStore.setChangeListener(listen);
		});

		$scope.$on('$beforeUnload', function(event, confirmation){

			if($scope.todos.isSavedToPouchDB){
				
				return $todoStore.destroy();
			}	

			confirmation.message = "You have unsaved todos!";

			event.preventDefault();

		});

		$scope.$on('$radixxDispatch', function(event, appState){

			/* automatically update view when a dispatch happens on the store */
			$scope.todos = state[title];
			console.log("on-dispatch: Radixx - " + JSON.stringify(appState));
		});

		$scope.$on('$destroy', function(event, data){

			/* unsubscribe store change listener */
			$todoStore.unsetChangeListener(listen);
			// $todoStore.disconnect();
		});

		$scope.addTodo = function(todo){

			/* this function is triggered by a button click  
				on the view and calls an action creator */
			$todoAction.addTodo(todo);
		};

		$scope.undo = function(){

			$todoStore.undo();
		};

		$scope.redo = function(){

			$todoStore.redo();
		};

		$scope.removeTodo = function(todoId){

			/* this function is triggered by a click on the view 
				and calls an action creator */
			$todoAction.removeTodo(todoId);
		};

}).run(['$rootScope', '$window', function($rootScope, $window){
	
		$window.onbeforeunload = $window.onunload = function(e){
			var e = e || window.event;

			var confirmation = {}, 
				event = $rootScope.$broadcast('$beforeUnload', confirmation);

			if('returnValue' in e
				&& event.defaultPrevented){
				e.returnValue = confirmation.message;
			}else{
				if(event.defaultPrevented)
					return confirmation.message;
			}

		};
}]);
```
>ReactJS 

```js
	
	/* using the idea of Presentation and Container components - Dan Abrahamov!! */

	// Asuuming to use socket.io (client-side)
	var socket = io.connect('http://locahost:8005', {timeout:300000, 'reconnection':true, transports:["websockets"]}),
	
	action = Radixx.createAction({
		'loadShoes':'LOAD_SHOES',
		'removeShoe':'REMOVE_SHOE',
		'addShoe':'ADD_SHOE'
	}),

	store = Radixx.createStore('shoes', function(action, area){
		var shoes;
		switch(action.actionType){
			case 'ADD_SHOE':
				shoes = area.get();
				shoes.push(action.actionData);
			break;
			case 'LOAD_SHOES':
				shoes = action.actionData;
			break;
			case 'REMOVE_SHOE':
				shoes = area.get();
				shoes.splice(action.actionData, 1);
				this.await([
					'clothes'
				], function(){
					
					/* assuming: custom pub/sub object for communicating 
						with other stores (not defined here) */
					E.emit('clothes', area.get());
				});
			break;
			default:
				return null;
			break;
		}

		return area.put(shoes);

	}, {shoes:[]});

	store.reactjs.mixin = {
		componentWillUnmount:function(){

			this._storeListener = this._onStoreChange.bind(this);
			/* unsubscribe store change listener */
			store.unsetChangeListener(this._storeListener);
		}
		componentDidMount:function(){

			/* Assuming use of socket.io library - joining a room */
			socket.join('shoelovers');

			/* subscribe store change listener */
			store.setChangeListener(this._storeListener);

		},
		getDefaultProps:function(){

			return store.getState();
		}
	};


	/* PRESENTATION COMPONENT */

	// defined with lifecycle hooks

	var ShoeComponent = React.createClass({
			getStyle: function(){

				return {
					display:'block',
					width:'450px',
					marginLeft:'auto',
					marginRight:'auto',
					backgroundColor:'#ee321f'
				};
			},
			render:function(){

				var shoes = this.props.shoes.map(function(shoe){
								return <li id={shoe.type}>{shoe.name}</li>
							}), 
					_style = this.getStyle();

				return (

					<section style={_style}>
						<form className="form" onSubmit={this.props.submit}>
							<input type="text" name="add" id="add" placeholder="Add Shoes..." onKeyPress={this.props.keyz} />
							<button type="submit">ADD</button>
						</form>
						<ul>
							{shoes}
						</ul>
					</section>

				);
			},
			
	});

	/* CONTAINER COMPONENT */

	// defined with lifecycle hooks

	var ShoeApp = React.createClass({
		propTypes:{
			shoes:React.PropTypes.array
		},
		mixins:[store.reactjs.mixin],
		getInitialState:function(){

			return {addingShoe:false,loadingShoes:false};
		},
		shouldComponentUpdate:function(nextProps, nextState){

			return this._deepEqual(this.state, nextState) && (nextProps.shoes.length != this.props.shoes.length);
		},
		componentWillMount:function(){

			/* if state doesn't conatian data, fetch from server */
			if(this.props.shoes.length == 0){
				this._fetch('http://localhost:5600/shoes').done(
					action.loadShoes.bind(action)
				);
			}
		},
		componentDidUpdate:function(){

			console.log(this.state);

			socket.emit('shoe-okay', this.props.shoes);
		},
		render:function(){

				 var _shoes = store.getState('shoes');

				 return (

				 	<ShoeComponent shoes={_shoes} submit={this.onSubmitForm.bind(this)} keyz={this.onKeyPress.bind(this)} />

				);
		},
		onKeyPress:function(e){

			/* 
				This is actually supposed to be debounced so we reduce the rate of "useless re-renders" - for now we use an if statement to make up for that 
			*/
			
			// functional `setState`

			if(this.state.addingShoe !== true){
				this.setState((prevState, props) => { 

					return {addingShoe:true}; 
				});
			}
		},
		onSubmitForm:function(e){
			
			e.preventDefault();

			var form = e.target;

			action.addShoe(form.elements['add'].value);
		},
		_fetch:function(_url, _verb, _data){
			if(!_verb)
				_verb = 'GET';

			if(!_data)
				_data = ""	

			/* Assuming `jQuery` is loaded in */

			return $.ajax({
				url:_url,
				method:_verb,
				data:_data
			});
		},
		_deepEqual: function(original, copy){
				
				function check (x, y) {
					  if ((typeof x == "object" && x != null) 
					  		&& (typeof y == "object" && y != null)) {
					    	
					    	if (Object.keys(x).length != Object.keys(y).length)
					      		return false;

						    for (var prop in x) {
						      	if (({}).hasOwnProperty.call(y, prop)){  
									if (! check(x[prop], y[prop]))
									 	 return false;
								}else{
									return false;
								}
						    }

						    return true;
					  }else if (x !== y){
					    	return false;
					  }else{
					    	return true;
					  } 	
				};
				
				return check(original, copy);
		},
		_storeListener:null,
		_onStoreChange:function(){
			
			console.log("store change detected!");

			// functional `setState`
			this.setState((prevState, props) => { 

				return {addingShoe:!prevState.addingShoe}; 
			});

		}
	});

	ReactDOM.render(<ShoeApp />, document.body, function(){
		console.log("shoes app is good to go!");
	});
	
```

>RactiveJS

```js

	var action = Radixx.createAction({'addItem':'ADD_ITEM','loadItem':'LOAD_ITEM'});
	var store = Radixx.createStore('shit', function(action, area){
					var item; 
					switch(action.actionType){
						case 'ADD_ITEM':
							item = area.get();
							item.push(action.actionData);
						break;
						case 'LOAD_ITEM':
							item = action.actionData;
						break;
					}
					
					return area.put(item);
	}, []);
	
	var shoeComponent = Ractive.extend({
	
  		template: '#tpl-app', /* id of {SCRIPT element} used to hold HTML view */
		beforeInit:function(){
			store.setChangeListener(this.onChange.bind(this));
		},
  		init: function () {
			var that = this;
    			this.on('change', function data) {
      				action.addItem(data);
    			});
			
			this.on('teardown', function(){
				store.unsetChangeListener(that.onChange);
			});
  		},
  		data: {
    			todos: (store.getState() || [])
  		},
		onChange:function(){
			this.set('todos', store.getState());
		}
	});
	
	var shoeView = new shoeComponent({
		el:'#root', /* id of mount point {DOM element} for ractive view  */
	});

	shoeView.on('update', function(data){	
		console.log("updated!");
	});
```

## Browser Support

- IE 8.0+ (Trident, Edge)
- Opera 9.0+ (Presto, Blink)
- Chrome 3.0+ (Webkit, Blink)
- Firefox 3.5+ (Gecko)
- Safari 4.0+ (AppleWebkit)

## Gotchas/Caveats

- Trying to `swap` the store callback using **swapCallback()** before setting a store listener using **setChnageListener()** will always throw a type error.

## License

MIT

## Contributing

Please feel free to open an issue, fix a bug or send in a pull request. I'll be very glad you did. You can also reach me on Twitter [@isocroft](https://twitter.com/isocroft). See the **CONTRIBUTING.md** file for more details.

[npm-url]: https://npmjs.com/package/Radixx
[downloads-url]: https://npmjs.com/package/Radixx
