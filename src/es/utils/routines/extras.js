
export const Values = {
      typesMap:{
                "number":Number,
                "array":Array,
                "object":Object,
                "string":String,
                "boolean":Boolean,
                "date":Date,
                "regexp":RegExp,	
                "function":Function
      },
      isOfType(type, value) {

              var type = type.toLowerCase(); // hoisting

              if(typeof type === 'function'){

                return type(value);
              }

              else if(typeof type === 'string'
                    && (type in this.typesMap)){
                return (/^string|function$/.test(typeof value)) 
                      || (Object(value) instanceof this.typesMap[type]);
              }

              return false;
      }
};

export const Store = ((() => {

	let requirementTypes = ['graph-ql', 'rest'];

	let serviceRequirementsMap = {};
	
	return function(title){

		const that = this;

		this.getTitle = () => title;

		this.toJSON = () => ({
            title
    });

		this.makeTrait = function(callback, ...argsLeft){

          if(typeof callback === 'function'){

                argsLeft.unshift(that);

                return callback(...argsLeft);
          }

			    return null;

		};

		this.toString = () => "[object RadixxStore]";
	}	

})());

// Action constructor
export const  Action = ((() => function(id){

    this.getId = () => id;

    this.toJSON = () => ({
        id
    });

    this.toString = () => "[object RadixxActionCreator]";
})());


