import * as observable from './components/observable.js';
import { Action, Store } from './utils/routines/extras.js';
import { Helpers } from './utils/helpers.js';
import { Payload } from './utils/primitive-checkers.js'

 /*!
  * @lib: Radixx
  * @version: 0.1.3
  * @author: Ifeora Okechukwu
  * @created: 30/12/2016
  *
  * All Rights Reserved 2016 - 2018.
  * Use, reproduction, distribution, and modification of this code is subject to the terms and
  * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
  *
  * @desc: Implementation of Facebooks' Flux Architecture with a Twist. [ ES6 ]
  */


function toString(){

    return "[object RadixxHub]";
}

const makeStore = function(dataTitle, registerCallback, defaultStateObj){
    
    function _store(...args){
        Store.apply(this, [...args]);
    }

    const storeObject = new _store(dataTitle);

    observable.setStoreObserver(storeObject, registerCallback, defaultStateObj);

    return storeObject;
}

const makeActionCreators = function(vectors){
    function _action(...args){
            Action.apply(this, [...args]);
    }

    const actionObject = new _action(observable.registerAction());

    return observable.setActionVectors(actionObject, vectors);
}

const purgePersistentStorage = function(){
    
    observable.purgePersistStore();
}

const eachStore = function(callback){
    
    return observable.eachStore(
        function(...args){
            callback(...args);
        }, function(stores, key){

                this.push(stores[key]);
    }, null);
}

let _hub = {
    eachStore
};


const attachMiddleware = function(callback) {

    return observable.setMiddlewareCallback(function(...args){
        callback(...args)
    });
}

const isAppStateAutoRehydrated = function() {

    return observable.isAppStateAutoRehydrated();
}

const onDispatch = function(handler){
    
    if(typeof handler === 'function'){

        observable.watchDispatcher(function(...args){
            handler(...args)
        });
    }
}

const configure = function(config) {
    
    return observable.mergeConfig(config, _hub);
}

const onShutdown = function(handler){

    if(typeof handler === "function"){

        observable.setupShutdownCallback(function(...args){
            handler(...args);
        }, _hub);
    }

}

const requestAggregator = function() {

    return observable.makeAggregator();
}

export { Helpers, Payload, makeStore, makeActionCreators, purgePersistentStorage, isAppStateAutoRehydrated, requestAggregator, configure, eachStore, attachMiddleware, onDispatch, onShutdown, toString }
