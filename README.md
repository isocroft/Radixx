# Radixx

This is a simple library that implements the _Facebook_ **Flux Architecture** with a twist to how the entire application state is managed and changed/updated. 

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

		var action = r.createAction({'loadTodos':'LOAD_TODOS'});
		var store = r.createStore('todos', function(action, area){
						var todos; 
						switch(action.actionType){
							case 'LOAD_TODOS':
								todos = action.actionData;
							break;
						}
						area.put(todos);
		});

		action.loadTodos([
			{
				text:'Make love to my wife!', 
				completed:true
			},
			{
				text:'Write that website re-design proposal',
				completed:false
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

- An extended Loose Coupling between Controllers/Controller Views. 
- A transparent way in separating mutation and asynchronousity in application state.
- No need to **<q>emit</q>** change events from within a store registration callback.
- No elaborate definition **Action Creators** &amp; **Stores** (Write less code).
- No need to use immutableJS library to help manage application state changes.
- The **Dispatcher** object is hidden and all you have is a **<q>Hub</q>** object.
- Includes an **<q>onDispatch</q>** event that exposes the entire application state.

## Benefits

- Use with Single Page Apps e.g. Angular 1/2, Ractive, React
- Use with Multi Page Apps e.g jQuery, Jollof, Laravel, Django, AdonisJS 

## Examples

>AngularJS 1.x

```js

// Top-level Module { Using the Angular 1 Provider Helper - $ngRadixx }

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
			'ngSanitize'
])

.factory("$todoAction", ['$ngRadixx',

	function($ngRadixx){

	var action_mappings = {
		'loadTodos':'LOAD_TODOS',
		'addTodo':'ADD_TODO',
		'removeTodo':'REMOVE_TODO'
	};
	
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
		area.put(todos);
	};
	
	return $ngRadixx.createStore(
		'todos',
		register
	);
}) 

.factory('$fetch', ['$http', function($http){
	
	return: {
		getTodos:function(url){
			return $http.get(url);
		}	
	}
}]);

.controller("TodoCtrl", ['$scope', '$todoAction', '$todoStore', '$pouchDB', '$fetch'
	function($scope, $todoActions, $todoStore, $pouchDB, $fetch){

		// get the 'key' for the {todos} store in the application state
		var title = $todoStore.getTitle(), 

		listen = (function(db){

				return function(){
					var data = this.getState();

					/* store change listeners stores data in local DB */	
					db.put(data) 
					.then(function(data){

							/* Assuming to use the Pusher Realtime backend service */ 
							return $http({
								url:'http://localhost:3248/broadcast/pusher',method:'POST',
								data:data
							}); 
					})
					.catch(function(err){ 
							console.log('App Error: ', err);
					});
				};

		}($pouchDB('todos')));


		/* loading todos from server */
		$fetch.getTodos('http://localhost:4002/todos').then(
			$todoAction.loadTodos
		);

		$scope.$on('$appReady', function(event, data){

			/* subscribe store change listener */
			$todoStore.setChangeListener(listen);
		});

		$scope.$on('$radixxDispatch', function(event, state){

			/* automatically update view when a dispatch happens on the store */
			$scope.todos = state[title];
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
						with other stores */
					E.emit('clothes', area.get());
				});
			break;
		}
		area.put(shoes);
	});

	var shoeComponent = React.createClass({

		getInitialState:function(){

			var shoes = store.getState() || [];
			return {shoes:shoes};
		},
		componentWillMount:function(){

			/* if state doesn't conatian data, fetch from server */
			if(this.state.shoes.length == 0){
				this._fetch('http://localhost:5600/shoes').done(
					action.loadShoes
				);
			}
		},
		componentWillUnmount:function(){

			/* unsubscribe store change listener */
			store.unsetChangeListener(this._onStoreChange);
		},
		componentDidMount:function(){

			/* Assuming use of socket.io library - joining a room */
			socket.join('losers');

			/* unsubscribe store change listener */
			store.setChangeListener(this._onStoreChange);
		},
		shouldComponentUpdate:function(nextProps, nextState){

			return this._deepEqual(this.state, nextState);
		},
		componentWillUpdate:function(nextState){

			socket.emit('nice-shoe', nextState.shoes);
		},
		render:function(){
			var shoes = this.state.shoes;

			return (

				<section>
					<form className="form" onSubmit={this.onSubmitForm}>
						<input type="text" name="add" placeholder="Add Shoes..." />
						<button type="submit">ADD</button>
					</form>
					<ul>
						{shoes.forEach(function(shoe){
							<li>{shoe}</li>
						})}
					</ul>
				</section>

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
		_deepEqual: function(original, copy){

		},
		_onStoreChange:function(){
			
			this.setState({shoes:store.getState()});
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

				store.setChangeListener(this._onChange);
		},
		componentDidMount: function(){

			Radixx.onDispatch(this._onDispatch);
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
			//this.props = state;
			this.setProps(state);
			
		},
		_onChange: function(){

			/* removes the spinner from the application view */
			this.setState({loading:false});
		},
		_deepEqual: function(original, copy){

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
					area.put(item);
	});
	
	var shoeView = new Ractive({
		el:'#root', /* id of mount point {DOM element} for ractive view  */
		template: '#tpl-app', /* id of {SCRIPT element} used to hold HTML view */
		data: {
			skills: (store.getState() || []),
			filter:function(item){
				var skills = this.get('skills');
			}
		},
		events:{
			'select-done':(function(w){

				w.document.onkeypress = function(){} 

				return function(node, ){
					
					if(true){
						fire({
							node:node,
							data:
						});
					}
				};	

			}(this)),
			'ready':(function(){ 

				return function(node){

					if(true){
						fire({
							node:node,
							data:
						});
					}
				};		
			}())
		}
	});

	shoeComponent.on('ready', function(event, data){

		store.setChangeListener(onChange);
	});

	shoeComponent.on('select-done', function(event, data){

		action.addItem(data);
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
