import * as observable from './components/observable.js';
import { Action, Store } from './utils/routines/extras.js';
import Helpers from './utils/helpers.js';
import Payload from './utils/primitive-checkers.js'



function makeStore(){
    observable.setStoreObserver();
}

function makeActionCreators(){
    observable.setActionVectors();
}

function purgePersistentStore(){

}

function isAppStateRehydrated(){

}

function configure(){

}

function attachMiddleware(){

}

function onDispatch(){

}

function onShutdown(){

}

export { Helpers, makeStore, makeActionCreators, purgePersistentStore, isAppStateRehydrated, configure, attachMiddleware, onDispatch, onShutdown }
