//节流函数
const throttle = (callback, millisecond) => {
  let prev = Date.now();
  return function() {
    const args = [...arguments];
    const that = this;
    const now = Date.now();
    if(now - prev >= millisecond) {
      console.log('this is throttle');
      callback.apply(that, args);
      prev = Date.now();
    }
  }
}
export default throttle;