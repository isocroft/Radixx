var Benchmark = require('benchmark'),

    Radixx = require('./src/radixx'),

    suite = new Benchmark.Suite(),

    __callback = function(actionType, actionKey){

          console.log("actionFired: ", storeTitle);
    },

    actions,

    store;


Radixx.onDispatch(function(appstate){

	   console.log("Entire Application State: ", appstate);
});

Radixx.attachMiddleware(function(next, action, prevState){

    next(
      action,
      prevState
    );

});


suite
  .add('Radixx#configure', function(){

      Radixx.configure({
          runtime:{
              spaMode:true
          },
          persistenceEnabled:true
      });
  })
  .add('Radixx#makeActionCreators', function() {
    
      actions = Radixx.makeActionCreators({
         'changeTesting':{
              type:'CHANGE_TESTING',
              actionDefinition:Radixx.Payload.type.number
         }
      });
  })
  .add('Radixx#makeStore', function() {
    
      store = Radixx.makeStore('test', function(action, state){

            var appmodels = state;
            
            switch(action.actionType){
                
                case "CHANGE_TESTING":

                    appstate.testing += action.actionData;
                break;

                default:
                    return null;
                break;
            }

            return appstate;

      }, {testing:1});
  })
  .add('Radixx.store#listen', function() {
    
      store.setChangeListener(__callback);
  })
  .add('Radixx.store#hydrate', function() {
    
      store.hydrate({
          testing:5.2
      });
  })
  .add('Radixx.store#state', function() {

      console.log(store.getState('testing'));
      
  })
  .add('Radixx.action#dispatch', function() {
    
      action.changeTesting(2);
  })
  .add('Radixx.store#destroy', function() {

      store.unsetChangeListener(__callback);
    
      store.disconnect();
      store.destroy();
  })
  .on('cycle', function(event) {
    
     console.log(String(event.target));
  })
  .run({ 'async': true });
