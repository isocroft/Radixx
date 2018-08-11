
export const Payload = {
        type:{
                     "array":"array",
                     "date":"date",
                     "string":"string",
                     "regexp":"regexp",
                     "boolean":"boolean",
                     "function":"function",
                     "object":"object",
                     "number":"number",
                     error(value) {

                            return (value instanceof Error || value instanceof TypeError);
                     },
                     nullable(value) {

                            return (value === null || value === undefined);
                     },
                     "numeric":{
                        Int(value) {
                            return isFinite(value) && (value === parseInt(value))
                        },
                        Float(value) {
                            return isFinite(value) && (value === parseFloat(value))
                        }
                     },
                     any(value) {
                            
                            return (value !== null || value !== undefined);	 			
                     }
          }
};
