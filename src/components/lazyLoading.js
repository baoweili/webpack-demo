const inSight = (el) => {
  const rect = el.getBoundingClientRect();
  const clientHeight = window.innerHeight;
  return rect.top <= clientHeight + 100;
};

const checkImg = () => {
  let imgs = document.querySelectorAll('img');
  Array.from(imgs).forEach(el => {
    if(inSight(el)) {
      loading(el);
    }
  });
};

const loading = (el) => {
  if(!el.src){
    const source = el.dataset.src;
    el.src = source;
  }
}

export default checkImg;









