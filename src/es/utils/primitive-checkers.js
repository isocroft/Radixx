import { wind } from './utils/routines/basics.js';

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

                            return (value instanceof wind.Error || value instanceof wind.TypeError);
                     },
                     nullable(value) {

                            return (value === null || value === undefined);
                     },
                     "numeric":{
                        Int(value) {
                            return wind.isFinite(value) && (value === wind.parseInt(value))
                        },
                        Float(value) {
                            return wind.isFinite(value) && (value === wind.parseFloat(value))
                        }
                     },
                     any(value) {
                            
                            return (value !== null || value !== undefined);	 			
                     }
          }
};
