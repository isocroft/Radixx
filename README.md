# Radixx

This is a simple library that implements the _Facebook_ **Flux Architecture** with a twist to how the entire application state is managed and changed/updated. It resembles **Redux** in a lot of ways. 

## How to Use (Vanilla JS)

```html
<!DOCTYPE html>
<html>
<head>
	<title>Radixx - Example App</title>
	<script type="text/javascript">
	;(function(r){
		r.onDispatch(function(app_state){
			/* fired when all synchronous/asynchronous 
				mutations are completely done on the state */
			console.log(JSON.stringify(app_state)); 
		});
		
		/* creating an action - multiple actions can be created for a real-life application */
		var action = r.createAction({loadTodos:'LOAD_TODOS',saveTodo:'SAVE_TODO'});
		
		/* creating a store - multiple stores can be created for a real-life application */
		var store = r.createStore('todos', function(action, area){
						var todos; 
						switch(action.actionType){
							case 'LOAD_TODOS':
								todos = action.actionData;
							break;
						}

						return area.put(todos);
		}, []);

		action.loadTodos([
			{
				text:'Buy flowers for my wife!', 
				completed:true
			},
			{
				text:'Write that website re-design proposal',
				completed:false
			}
		]);

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
								return {todoTimeToDueDate:(new Date*1),todo:val};
							});
						};
					break;
				}

				return area.put(todos);
		});

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
	}(this.Radixx));	
	</script>
</head>
<body>
	<ul id="todos"></ul>

	<script type="text/javascript">
		;(function(d){

			var mount_point = d.getElementById("todos");
			var li = null;
			var list = store.getState();

			list.forEach(function(item, i){
				li = d.createElement("li");
				li.setAttribute("data-key", i);
				li.setAttribute("data-todo-done", String(item.completed));
				item.appendChild(d.createTextNode(item.text));
				mount_point.appendChild(item);
			});

		}(this.document));
	</script>
</body>
</html>
```

## Features

- Finite Undo/Redo (cos we have got to have trade-offs - Performance suffers if you have infinite undo/redo)
- Use of Mixins for ReactJS (even though most people think mixins are dead and composition should be the only thins used)
- Can replace the store callback (similar to **replaceReducer()** in _Redux_)
- An extended Loose Coupling between Radixx Dispatcher and Controllers/Controller Views.
- Configure the order in which the <q>dispacth</q> triggers the store callbacks.
- A transparent way in separating mutation and asynchronousity in application state.
- No need to **<q>emit</q>** change events from within a store registration callback.
- No elaborate definition **Action Creators** &amp; **Stores** (Write less code).
- No need to use immutableJS library to help manage application state changes.
- The **Dispatcher** object is hidden and all you have is a **<q>Hub</q>** object.
- Includes an **<q>onDispatch</q>** event that exposes the entire application state.

## Benefits

- Use with Single Page App Frameworks/Libraries e.g. Angular 1/2, Ractive, React
- Use with Multi Page App Frameworks as well e.g jQuery, Jollof, Laravel, Django, AdonisJS 

## Best Practices (Dos and Don'ts)

- Application UI State {a.k.a Volatile Data} -- can't store this in Radixx (Text Input - being entered, Animation Tween Properties/Values, Scroll Position Values, Text Box Caret Position, Mouse Position Values, Unserializable State - like functions)
- Application Data State {a.k.a Non-Volatile Data} -- can store this in Radixx (Lists for Render fetched from API endpoints, any piece of Data displayed on the View)

> NOTE: When using Radixx with ReactJS, it is best to ascribe/delegate Application UI State to {this.state} and {this.setState(...)} and Application Domain Data State to {this.props} and {properties={...}} respectively.


## About Redux (with respect to Radixx)

Hers's how **Redux** is simply described

> Redux is basically event-sourcing where there is a single projection to consume (the application state).

Someone had this to say about the state of **Redux** single store

> I'm also not impressed about every action having to go “all the way” upwards (to the central store) instead of short-circuiting somewhere.

That being said, here is a round-up of what makes **Redux** a GREAT tool (for some use cases) and what doesn't make it so ideal (for all use cases)

# Gains of Redux single store

- Infinte Undo/Redo + Live-Editing Time Travel (As application state is immutable)
- Predictable Atomic Operation on Application state object (As action are run in a specific predictable order)
- Single source of truth (No Guesswork!!)

# Troubles with Redux single store

- A sizable amount of boilerplate code (especially with **connect()** and **mapStateToProps()**) is required to get Redux up and running.
- Dynamically structured state is impossible. (mature, complex apps need this the most).
- Increased probability of state key(s) collisions between reducers (likely in a big complex web app).
- Global variables are bad (This applies to the composition of the Redux application state itself) always.
- Performance suffers as your state tree gets larger (Immutability is a good thing...sometimes).
- Each time the **connect()** decorator is called, it pulls in the entire application state.


_Your best bet in all these is to choose the trade-offs wisely (depending on the peculiarities of the web app you're building)_


> NOTE: **Radixx** is not an outright drop-in replacement for **Redux** but a nice alternative when **Redux** doesn't quite fit your use case.


## Examples

>AngularJS 1.x

```js

// Top-level Module { Using the Angular 1.x Provider Helper - $ngRadixx }

angular.module("appy", [ 
			'ui.router',
			'ngRadixx'
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
			'ngSanitize',
			'pouchdb' /* using angular-pouch module */
])

.factory("$todoAction", ['$ngRadixx',

	function($ngRadixx){

	var action_mappings = {
		'loadTodos':'LOAD_TODOS',
		'addTodo':'ADD_TODO',
		'removeTodo':'REMOVE_TODO'
	};
	
	/* create an action object with all necessary action names */
	return $ngRadixx.createAction(
		action_mappings
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

		// get the 'key' for the {todos} store (part) in the application state
		var title = $todoStore.getTitle(), 

		listen = (function(db){

				return function(){
					var data = this.getState();
					data._id = (new Date)*1;
					
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
		$fetch.getTodos('http://localhost:4002/todos/all').then(
			$todoAction.loadTodos.bind($todoAction)
		);

		$scope.$on('$appReady', function(event, data){

			/* subscribe store change listener */
			$todoStore.setChangeListener(listen);
		});

		$scope.$on('$radixxDispatch', function(event, state){

			/* automatically update view when a dispatch happens on the store */
			$scope.todos = state[title];
			console.log("on-dispatch: " + JSON.stringify(state));
		});

		$scope.$on('$destroy', function(event, data){

			/* unsubscribe store change listener */
			$todoStore.unsetChangeListener(listen);
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

}).run(['$rootScope', function($rootScope){
	
		$rootScope.$broadcast('$appReady', "");
}]);
```
>ReactJS 

```js

	var socket = io.connect('http://locahost:8005', {timeout:300000, 'reconnection':true, transports:["websockets"]});
	
	var action = Radixx.createAction({
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
					
					/* custom pub/sub object for communicating 
						with other stores (not defined here) */
					E.emit('clothes', area.get());
				});
			break;
		}

		return area.put(shoes);
	}, []);

	store.reactjs.mixin = {
		componentWillUnmount:function(){

			/* unsubscribe store change listener */
			store.unsetChangeListener(this._onStoreChange.bind(this));
		},
		componentWillMount:function(){

			/* if state doesn't conatian data, fetch from server */
			if(this.state.shoes.length == 0){
				this._fetch('http://localhost:5600/shoes').done(
					action.loadShoes.bind(action)
				);
			}
		},
		componentDidMount:function(){

			/* Assuming use of socket.io library - joining a room */
			socket.join('losers');

			/* unsubscribe store change listener */
			store.setChangeListener(this._onStoreChange.bind(this));
		},
		getDefaultProps:function(){

			return {shoes:store.getState()};
		}
	};

	var shoeComponent = React.createClass({

		mixins:[store.reactjs.mixin],
		getInitialState:function(){

			return {isShoeOkay:false,loadingShoes:false};
		},
		shouldComponentUpdate:function(nextProps, nextState){

			return this._deepEqual(this.state, nextState) && (nextProps.shoes.length != this.props.shoes.length);
		},
		componentWillUpdate:function(nextState){

			socket.emit('shoe-okay', nextState.isShoeOkay);
		},
		render:function(){

			var shoes = this.props.shoes;

			return (

				<section>
					<form className="form" onSubmit={this.onSubmitForm}>
						<input type="text" name="add" placeholder="Add Shoes..." />
						<button type="submit">ADD</button>
					</form>
					<ul>
						{shoes.forEach(function(shoe){
							<li id={shoe.type}>{shoe.name}</li>
						})}
					</ul>
				</section>

			);
		},
		onSubmitForm:function(e){
			e.preventDefault();

			var form = e.target;

			this.setState({isShoeLoading:true});

			action.addShoe(form.elements['add'].value);
		},
		_fetch:function(_url, _verb, _data){
			if(!_verb)
				_verb = 'GET';

			if(!_data)
				_data = ""	

			/* Assuming jQuery is loaded in */	
			return $.ajax({
				url:_url,
				method:_verb,
				data:_data
			});
		},
		_deepEqual: function(original, copy){
				function check (x, y) {
					  if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
					    if (Object.keys(x).length != Object.keys(y).length)
					      return false;

					    for (var prop in x) {
					      if (({}).hasOwnProperty.call(y, prop))
					      {  
						if (! check(x[prop], y[prop]))
						  return false;
					      }
					      else
						return false;
					    }

					    return true;
					  }
					  else if (x !== y)
					    return false;
					  else
					    return true;
				};
				
				return check(original, copy);
		},
		_onStoreChange:function(){

			this.props.shoes = store.getState();
			
			this.setState({isShoeLoading:false});
		}
	});

	React.render(<shoeComponent />, document.body);


	OR

	/* using the idea of Presentation and Container components */

	var ShoeList = React.createClass({
			getStyle: function(){

				return {
					listStyle:'none'
				}
			},
			render: function(){

				 return (

				 	var shoes = this.props.shoes;
				 	var styles = this.getStyle();
				
					<ul style={styles}>
						{shoes.forEach(function(shoe, i){
							<li index={i}>{shoe}</li>
						})}
					</ul>

				);
			}
	});

	var shoeComponent = React.createClass({
		getinitialState: function(){

			/* used to show a spinner in the application view */
			return {loading:true};
		},
		getDefaultProps: function(){

			return {};
		},
		componentWillMount: function(){

			/* if state doesn't conatian data, fetch from server */
			if(!('shoes' in this.props)){
				this._fetch('http://localhost:5600/shoes').done(
					action.loadShoes
				);
			}
		},
		shouldComponentUpdate:function(nextProps, nextState){

			return this._deepEqual(this.props, nextProps);
		},
		componentWillRecieveProps: function(nextProps){

			socket.emit('nice-shoe', nextProps.shoes);
		},
		componentDidMount: function(){

				/* Assuming use of socket.io library - joining a room */
				socket.join('losers');

				store.setChangeListener(this._onChange.bind(this));

				Radixx.onDispatch(this._onDispatch.bind(this));
		},
		componentWillUnmount:function(){

				store.unsetChangeListener(this._onChange.bind(this));
		},
		render:function(){

			return (	
					<form className="form" onSubmit={this.onSubmitForm}>
						<input type="text" name="add" placeholder="Add Shoes..." />
						<button type="submit">ADD</button>
					</form>	

					<ShoeList shoes={this.props.shoes} /> 
			);				
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

			/* Assuming jQuery is loaded in */	
			return $.ajax({
				url:_url,
				method:_verb,
				data:_data
			});
		},
		_onDispatch:function(state){

			/* this basically maps the application state to the component props */
			this.props.data = state;
			
		},
		_onChange: function(){

			/* removes the spinner from the application view */
			this.setState({loading:false});
		},
		_deepEqual: function(original, copy){
				function check (x, y) {
					  if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
					    if (Object.keys(x).length != Object.keys(y).length)
					      return false;

					    for (var prop in x) {
					      if (({}).hasOwnProperty.call(y, prop))
					      {  
						if (! check(x[prop], y[prop]))
						  return false;
					      }
					      else
						return false;
					    }

					    return true;
					  }
					  else if (x !== y)
					    return false;
					  else
					    return true;
				};
				
				return check(original, copy);
		}
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

## License

MIT

## Contributing

Please feel free to open an issue or send in a pull request. I'll be very glad you did. You can also reach me on Twitter [@isocroft](https://twitter.com/isocroft). See the **CONTRIBUTING.md** file for more details.
