import * as observable from './components/observable.js';
import { Action, Store } from './utils/routines/extras.js';
import Helpers from './utils/helpers.js';
import Payload from './utils/primitive-checkers.js'


function toString(){   
    return "[object RadixxHub]";
}

function makeStore(dataTitle, registerCallback, defaultStateObj){
    function _store(...args){
        Store.apply(this, args);
    }

    const storeObject = new _store(dataTitle);

    observable.setStoreObserver(storeObject, registerCallback, defaultStateObj);

    return storeObject;
}

function makeActionCreators(vectors){
    function _action(...args){
            Action.apply(this, args);
    }

    const actionObject = new _action(observable.registerAction());

    return observable.setActionVectors(actionObject, vectors);
}

function purgePersistentStorage(){
    
    observable.purgePersistStore();
}

function eachStore(callback){
    
    return observable.eachStore(callback, function(stores, key){
                this.push(stores[key]);
    }, null);
}

function configure(config) {
        
        let _hub = {
            eachStore
        };
    
        observable.mergeConfig(config, _hub);
}

function attachMiddleware(callback) {

    observable.setMiddlewareCallback(callback);
}

function isAppStateAutoRehydrated() {

    return observable.isAppStateAutoRehydrated();
}

function onDispatch(handler){
    
    if(typeof handler === 'function'){

            observable.watchDispatcher(handler);
    }
}

function onShutdown(){

}

function requestAggregator() {

    return observable.makeAggregator();
}

export { Helpers, Payload, makeStore, makeActionCreators, purgePersistentStore, isAppStateAutoRehydrated, configure, eachStore, attachMiddleware, onDispatch, onShutdown, toString }
