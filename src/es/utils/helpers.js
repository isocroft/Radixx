import { wind } from './routines/basics.js';

const Helpers = {
        isEqual(former, latter) {
                      if (former === latter) {
                        return true;
                      }

                      if (typeof former !== 'object' || former === null ||
                          typeof latter !== 'object' || latter === null) {
                            return false;
                      }

                      const keysA = wind.Object.keys(former);
                      const keysB = wind.Object.keys(latter);

                      if (keysA.length !== keysB.length) {
                        return false;
                      }

                      // Test for A's keys different from B.
                      const bHasOwnProperty = wind.hasOwnProperty.bind(latter);
                      for (let i = 0; i < keysA.length; i++) {
                        if (!bHasOwnProperty(keysA[i]) || former[keysA[i]] !== latter[keysA[i]]) {
                          return false;
                        }
                      }
        }
};

export { Helpers }
