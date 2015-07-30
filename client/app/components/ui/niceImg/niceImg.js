import './niceImg.styl';

export const niceImg = ()=> {
  return ($scope, element)=> {
    if (!/img/i.test(element[0].tagName)) {
      return;
    }

    element[0].onload = ()=> {
      element.addClass('img-loaded');
    }
  };
}
