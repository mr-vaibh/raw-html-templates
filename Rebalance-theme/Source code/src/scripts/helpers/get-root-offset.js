// returns pixel value representing the offset from child element to root
// const { left, top } = getRootOffset(el);

export default (el, root = window) => {
  let parent = el;
  const bounds = {
    top: 0,
    left: 0,
  };

  do {
    if (!isNaN(parent.offsetTop)) {
      bounds.top += parent.offsetTop;
    }
    if (!isNaN(parent.offsetLeft)) {
      bounds.left += parent.offsetLeft;
    }
    parent = parent.offsetParent;
  } while (parent && parent !== root);

  return bounds;
};
