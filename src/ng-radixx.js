 /*!
  * @lib: ngRadixx
  * @version: 0.1.3
  * @author: Ifeora Okechukwu
  * @created: 30/12/2016
  *
  *
  * @desc: AngularJS 1.x helper library for radixx apps
  */

;(function(w, d, a){

	if(!a){

		throw new Error("ngRadixx requires [AngularJS] v1.x");

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
			setTimeout(function(){

				$window.Radixx.configure(config);

				$window.Radixx.onDispatch(rootScopeMapper($injector)); 

			}, 0);

			return new function(){

				// Adapter Method here

				this.makeActionCreators = function(actionsVectors){

					return $window.Radixx.makeActionCreators(actionsVectors);
				};

				// Adapter Method here

				this.makeStore = function(storeTitle, storeCallback, defaultStateObj){

					return $window.Radixx.makeStore(storeTitle, storeCallback, defaultStateObj);		
				};	

				this.eachStore = function(func){

						return $window.Radixx.eachStore(func);
				};

				this.attachMiddleware = function(func){

					return $window.Radixx.attachMiddleware(func);

				};

				this.requestAggregator = function(){

						return $window.Radixx.requestAggregator();
				};

				this.onShutdown = function(func){

						return $window.Radixx.onShutdown(func);

				};

				this.isAppStateAutoRehydrated = function(){

						return $window.Radixx.isAppStateAutoRehydrated();
				}

				this.purgePersistentStorage = function(){

					return $window.Radixx.purgePersistentStrorage();
				}

			}
		}];
	}


	ngRadixx.provider("$ngRadixx", ngRadixxProvidence);


}(this, this.document, this.angular));
