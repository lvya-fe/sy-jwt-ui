'use strict';

// import {get, post, url} from './service/ApiDecorator';
// import * as Store from './service/Store';

import * as Coms from './module'


const EduComs = {
  install(Vue) {
    for (let key in Coms) {
      Vue.component(key, Coms[key]);
    }
  }
}

export default EduComs

// export {
//   get,
//   post,
//   url,
//   Store
// }
