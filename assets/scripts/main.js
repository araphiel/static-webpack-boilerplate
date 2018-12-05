/* eslint-disable */
/**
 * If you want page specific javascript, I'd recommend
 * create a new file and adding to webpack as an entrypoint.
 * If you want things consolidate you can use DOM Based Routing (see the bodyClass function)
 * or use webpacks code-splitting (which can also work with the above)
*/

// Note: You can use jQuery. See webpack.config.js - line 81


import 'bootstrap';
import { bodyClass } from './globals/helpers';

if (bodyClass('sample')) {
  let randomNum = x => x * Math.ceil(100 * Math.random()),
      fun = document.querySelector('#fun');
        
  document.addEventListener("DOMContentLoaded", () => {
    setInterval(x => fun.innerHTML = `ES${randomNum(5)}`, 500)
  })
}
