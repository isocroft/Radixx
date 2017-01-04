 /*!
  * @lib: ngRadixx
  * @version: 0.0.1
  * @author: Ifeora Okechukwu
  * @created: 30/12/2016
  *
  *
  * @desc: AngularJS 1.x helper library for radixx apps
  */

;(function(w, a){

	if(!a){
		throw new Error("ngRadixx requires [AngularJS]");
		return;
	}

	var ngRadixx = a.module("ngRadixx", []);

	function ngRadixxProvidence(){

		var rootScopeEvent = '$radixxDispatch',	

		rootScopeMapper = function(inj){
			
			return function(state){
				var $rootScope = inj.get('$rootScope');
				if($rootScope){
					$rootScope.$broadcast(rootScopeEvent, state);
				}
			}

		},

		config = null;

		this.configure = function(configObject){
		
			config = configObject;	
		};


		this.$get = ['$window', '$injector', function($window, $injector){

 			var that = this;

			/* 
				Since "$get()" gets called only once, our config 
			   	is only added once - so also our dispatch handler  ;)
			*/	

			$window.Radixx.config(config);

			$window.Radixx.onDispatch(rootScopeMapper($injector)); 



			return new function(){

				// Adapter Method here

				this.createAction = function(actionsVectors){

					return $window.Radixx.createAction(actionsVectors);
				};

				// Adapter Method here

				this.createStore = function(storeTitle, storeCallback){

					return $window.Radixx.createStore(storeTitle, storeCallback);		
				};	

			}
		}];
	}


	ngRadixx.provider("$ngRadixx", ngRadixxProvidence);


}(this, this.angular));