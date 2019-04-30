import './styles/index.css';
import lazyLoading from './components/lazyLoading';
import throttle from './utils/throttle';
import handleApp from './handleApp';
import add from './add';
import './hello';
import $ from 'jquery';
console.log(add(1, 2));
handleApp();
//先执行一遍
lazyLoading();
window.addEventListener('scroll', throttle(lazyLoading, 200));

if(module.hot) {
  module.hot.accept();
}



