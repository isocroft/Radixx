var Benchmark = require('benchmark'),

    Radixx = require('./src/radixx'),

    suite = new Benchmark.Suite(),

    action,

    store;


Radixx.onDispatch(function(appstate){

	   console.log("Entire Application State: ", appstate);
});


suite
  .add('Radixx#configure', function(){

      Radixx.configure({

      });
  })
  .add('Radixx#createAction', function() {
    
      action = Radixx.createAction({
         'changeTesting':{
            type:'CHANGE_TESTING',
            actionDefinition:[Radixx.Payload.types.number.isInt]
         }
      });
  })
  .add('Radixx#createStore', function() {
    
      store = Radixx.createStore('test', function(action, state){
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

      }, {testing:1,retesting:null});
  })
  .add('Radixx.store#listen', function() {
    
      store.setChangeListener(function(storeTitle, actionKey){

          console.log("actionFired: ", storeTitle);
      });
  })
  .add('Radixx.store#hydrate', function() {
    
      store.hydrate({
          testing:5.2,
          retesting:[]
      });
  })
  .add('Radixx.store#state', function() {

      console.log(store.getState('retesting'));
      
  })
  .add('Radixx.action#dispatch', function() {
    
      action.changeTesting(2);
  })
  .add('Radixx.store#destroy', function() {
    
      store.disconnect();
      store.destroy();
  })
  .on('cycle', function(event) {
    
     console.log(String(event.target));
  })
  .run();