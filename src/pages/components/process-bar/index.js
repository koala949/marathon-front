import React, { useState } from 'react';
import styles from './index.less';

export default function ProcessBar({ id, onProcessChange = () => {} }) {
  var body = document.body;
  const [drag, setDrag] = useState(false);
  const [processValue, setProcessValue] = useState(0);
  let offsetX;

  const handleMouseDown = e => {
    setDrag(true);
    //获取鼠标按下时的位置坐标
    offsetX = e.clientX;
  };

  body.onmousemove = function(e) {
    var probnt = document.getElementById(`proBnt-${id}`);
    var progress = document.getElementById(`progress-${id}`);
    var percentString = document.getElementById(`percent-${id}`);

    if (drag) {
      //获取当前鼠标的位置
      const X = e.clientX;
      const { left, width } = progress.getBoundingClientRect();

      progress.value = ((X - left) / (width - 12)) * 100;
      const percent = parseInt(progress.value) / 100;
      const newLeft = (width - 12) * percent + 5;
      probnt.style.marginLeft = newLeft + 'px';
      percentString.innerHTML = `${parseInt(progress.value)}%`;
      setProcessValue(parseInt(progress.value));
    }
  };

  body.onmouseup = function() {
    setDrag(false);
    onProcessChange(processValue);
  };

  return (
    <div style={{ width: '50%', minWidth: 50 }}>
      <div className={styles.percent} id={`percent-${id}`}>
        0%
      </div>
      <div className={styles['progress-bar']}>
        <progress id={`progress-${id}`} value="0" max="100"></progress>
        <div
          id={`proBnt-${id}`}
          className={styles['progress-btn']}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
    </div>
  );
}
