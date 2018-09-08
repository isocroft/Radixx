
const wind = (('undefined' !== typeof process &&
    '[object process]' === ({}).toString.call(process)) ||
  ('undefined' !== typeof navigator && navigator.product === 'ReactNative')
? global : typeof window !== "undefined" ? window : self);

const Hop = ({}).hasOwnProperty;

const Slc = ([]).slice;

const isNullOrUndefined = obj => obj == void 0;


const each = (obj, iterator, context) => {
	
	if(context === undefined){

		    context = null;
	}

	for(let prop in obj){
		  if(Hop.call(obj, prop)){
			    iterator.call(context, obj[prop], prop, obj);
		  }
	}
};

/**
 *
 * @params
 * @params
 * @return
 */

const extend = (source, dest) => {

	 let merge = {};

	 for(let prop in dest){
  		if(Hop.call(dest, prop)){

    			if(typeof dest[prop] === "object"
    	 			&& dest[prop] !== null){
    			 	merge[prop] = extend(source[prop], dest[prop]);
    			 }else if(source && Hop.call(source, prop)){
    			 	merge[prop] = source[prop];
    			 }else {
    			 	merge[prop] = dest[prop];
    			 }
  		}
	 }

	return merge;
};

const curry = (func, args, context) => function(){
    let _args = Slc.call(arguments);
    return func.apply(context, args.concat(_args)); 
};

const futuresStates = {
     STARTED:0,
     AWAIT:1,
     RESOLVED:2,
     REJECTED:3
};

const formatOptions = opts => {
     const options = {}, _opts = String(opts).split(",");
     each(_opts, key => {
           options[key] = true;
     });
     options.savedData = !1;
     return options;
};

const Routines = opts => {
    const options = formatOptions(opts);
    let fireStart;
    let fireEnd;
    let index;
    let fired;
    let firing;
    let pending = [];
    let queue = options.multiple && [];

    const fire = data => {
          options.savedData = !fire.$decline && options.save && data; // save it only when we are not rejecting {fire.$decline != true}!
          fired = true;
          firing = true; // firing has begun!
          index = fireStart || 0;
          fireEnd = pending.length;
	    
          for(fireStart = 0; index < fireEnd; index++){
                 // @TODO: need to curry args instead of directly binding them #DONE
               wind.setTimeout(curry(pending[index], data[1], data[0])/*.bind(data[0], data[1])*/, 20); // fire asynchronously (Promises/A+ spec requirement)
          }
	    
          firing = false; // firing has ended!

          if(queue){ // deal with the queue if it exists and has any contents...
              if(queue.length){
                  return fire(queue.shift()); // fire on the {queue} items recursively
              }
               // if queue is empty.... then end [flow of control] at this point!
          }

          fire.$decline = false;
          
          if(options.savedData){
             if(options.unpack){
                 // clear our {pending} list and free up some memeory!!
                 pending.length = 0; // saves the reference {pending} and does not replace it!
             }
          }
 };

    return {
    add() {
        let len = 0;
        if(pending){ // if not disbaled
            
            const start = pending.length;
            (function add(args){
             
                   each(args, arg => {
			  const type = typeof arg;
                          
                          if(type == "function"){
                             	len = pending.push(arg);
                          }else{
                             if(!!arg && arg.length && typeof arg != "string"){
                             	 // inspect recursively
                                 add(Slc.call(arg)); 
                             }
                          }
                   });
             
             }(Slc.call(arguments)));
            
            
			if( fired ){ // if we have already run the {pending} list of routines at least once, ...
				   if(options.join){
					  fireStart = start; 
					  fireEnd = len; // update info again...
					  fire.$decline = true;
					  fire( options.savedData ); // fire with the saved data 
					  this.disable();
					  
				   }  
			}
            
            
        }
        return len;
    },
    hasFn(fn) {
	    	let result = false;
            	each(pending, val => {
		     if(typeof fn === "function" && fn === val)
			      result = true;
		}, this);
		return result;
    },
    hasList() {
        return !!pending; // [false] only when the disabled(); method has been called!!
    },
    fireWith() /* context, args */{
        if(pending && (!fired || queue)){
            const args = arguments.length && Slc.call(arguments) || [null, 0];
            
            if(firing){ // we are currently iterating on the {pending} list of routines
                queue.push( args ); // queue assets for recursive firing within {fire} function later
            }else{
                fire( args );
            }
        }
    },
    disable() {
	    if(!options.savedData){
             pending = queue = undefined;
	    }
    }
  };
};

// Futures constructor - Promises/A+ Spec Implementation (Influenced by jQuery though...)

let Futures = function(){

    const defTracks = {
        resolve:['done', 'RESOLVED', Routines(['join', 'save'])],
        reject:['fail', 'REJECTED', Routines(['join','save'])],
        notify:['progress', 'AWAIT', Routines(['join', 'multiple'])]
    };

    const self = this;
    let keys = Object.keys(defTracks);

    let setter = (fnName, arr, forPromise) => {
        const drop = (fnName != "notify");
        if(!arr.length && !forPromise) return defTracks[fnName][2].fireWith;
        return (!forPromise)? function(){
            if(self.state >= 0 && self.state <=1){
                self.state = futuresStates[defTracks[fnName][1]];
            }

            defTracks[fnName][2].fireWith(self === this? self : this, [].slice.call(arguments));

            if(drop){
			    defTracks[arr[0]][2].disable();
                defTracks[arr[1]][2].disable();
			    switch(fnName){	
				   case "reject":
				   case "resolve":
				      self.state = futuresStates[defTracks[fnName][1]];
				   break;
			    }	
			}
            return true;
        } : function(){
            if(self.state >= 0 && self.state <=1){
                defTracks[fnName][2].add.apply(self, Slc.call(arguments));
            }
            return self;
        } ;
    };

    let i = 0;
    let ax = keys.slice();
    let d;
    const promise = {};


    // using a closure to define all the functions on the fly...

    for(d in defTracks){
        if(Hop.call(defTracks, d)){
            keys.splice(i++, 1);
            self[d] = setter(d, keys);
            self[`${d}With`] = setter(d, []);
            promise[defTracks[d][0]] = setter(d, [], true);
            keys = ax.slice();
        }
    }

    promise.state = futuresStates.STARTED;

    promise.always = function(){
        return this.done.apply(self, arguments).fail.apply(self, arguments);
    };

    promise.promise = obj => {
        if(obj && typeof obj == "object" && !obj.length){
            for(const i in promise){
                if(Hop.call(promise, i)){
                    obj[i] = promise[i];
                }
            }
            return obj;
        }
        return promise;
    };

    promise.then = function(/* fnDone, fnFail, fnProgress */){
        let ret;
        const args = [].slice.call(arguments);
        args.forEach((item, i) => {
                     item = (typeof item == "function") && item;
                     self[defTracks[keys[i]][0]](function(){
							let rt;
							try{ 
								/*
									Promises/A+ specifies that errors should be contained
									and returned as value of rejected promise
								*/
							   rt = item && item.apply(this, arguments);
							}catch(e){ 
							   rt = this.reject(e);
							}finally{
							   if(rt && typeof rt.promise == "function")
							        ret = rt.promise();						   
							}	   
                     });
        });
        return self.promise(ret);
    };

    promise.isResolved = () => !defTracks['reject'][2].hasList();
    promise.isRejected = () => !defTracks['resolve'][2].hasList();
    promise.pipe = promise.then;

    promise.promise(self);

    Futures.STARTED = futuresStates.STARTED;
    Futures.AWAITING = futuresStates.AWAIT;
    Futures.RESOLVED = futuresStates.RESOLVED;
    Futures.REJECTED = futuresStates.REJECTED;

    /* avoid leaking memory with each call to Futures constructor!! */
    setter = ax = d = i = null;

    /* enforce {new} on constructor */
    return (self instanceof Futures)? self : new Futures();
};

export { Hop, Slc, isNullOrUndefined, wind, each, extend, curry, Futures }
