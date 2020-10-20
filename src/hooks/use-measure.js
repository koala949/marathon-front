import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useWindowSize } from 'react-use';
import { useRef } from 'react';

/**
 * 判断是否为dom元素
 * @param {HTMLElement} obj - dom元素
 */
export function isDom(obj) {
  if (typeof HTMLElement === 'object') return obj instanceof HTMLElement;
  return (
    obj &&
    (typeof obj === 'object') & (obj.nodeType === 1) &&
    typeof obj.nodeName === 'string'
  );
}

export function getElementTop(el) {
  let actualTop = el.offsetTop;
  let current = el.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}

export function getElementLeft(el) {
  let actualLeft = el.offsetLeft;
  let current = el.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}

/**
 * 测量dom元素的位置和大小
 * @returns {{ ref, size }}
 */
export default function useMeasure(element) {
  const ref = useRef();
  const [size, setSize] = useState({});
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  function updateSize(el) {
    const top = getElementTop(el);
    const left = getElementLeft(el);
    setSize({
      top,
      left,
      width: el.offsetWidth,
      height: el.offsetHeight,
      adaptiveHeight: windowHeight - top,
      adaptiveWidth: windowWidth - left,
    });
  }

  useEffect(() => {
    const _element = (function() {
      if (isDom(element)) return element;
      if (!ref.current) return null;
      if (isDom(ref.current)) return ref.current;
      return ReactDOM.findDOMNode(ref.current);
    })();

    if (_element) {
      updateSize(_element);
    }
  }, [ref.current, element, windowHeight, windowWidth]); // eslint-disable-line

  return [ref, size];
}
