import './styles/login.css';
import add from './add.js'
import './hello';
import $ from 'jquery';
console.log(add(1, 2));
//先执行一遍
console.log('hello');
console.log('login');
if(module.hot) {
  module.hot.accept();
}
