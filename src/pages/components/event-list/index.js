import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import styles from './index.less';
import { Row, Col, Input } from 'antd';
import uuid from 'node-uuid';
import AddImg from '@/assets/img/add_icon.png';
import DeleteIcon from '@/assets/img/ic_delete@2x.png';
import ProcessBar from '../process-bar';

function EventList(props, ref) {
  const {
    comp: { title, initCount },
  } = props;
  const [eventData, setEventData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newValue, setNewValue] = useState(''); //当前输入的内容

  useEffect(() => {
    const newArr = [];
    for (let i = 1; i <= initCount; i++) {
      const newItem = {
        id: uuid(),
        content: '',
        process: 0,
      };
      newArr.push(newItem);
    }
    setEventData(newArr);
  }, [initCount]);

  // 传给父组件
  useImperativeHandle(ref, () => ({
    eventData,
  }));

  // 点击添加
  const onAddBtnClick = () => {
    const newFunc = { id: uuid(), content: '' };
    setEventData([...eventData, newFunc]);
  };

  // 处理input的变化
  const handleValue = (e, item) => {
    setEditId(item.id);
    setNewValue(e.target.value);
  };
  // 获取焦点
  const onInputFocus = item => {
    setNewValue('');
    setEditId(item.id);
  };

  // input失焦时将名称的值传入
  const onInputBlur = (e, item) => {
    const temp = [...eventData];
    const newContent = { ...item, content: e.target.value };
    const changeIndex = temp.findIndex(v => v.id === item.id);
    if (changeIndex !== -1) {
      temp.splice(changeIndex, 1, newContent);
    }
    setEditId(null);
    setEventData(temp);
  };

  //删除
  const onDeleteClick = item => {
    const temp = [...eventData];
    const deleteIndex = temp.findIndex(v => v.id === item.id);
    if (deleteIndex !== -1) {
      temp.splice(deleteIndex, 1);
    }
    setEditId(null);
    setEventData(temp);
  };

  // 进度条变化
  const onProcessChange = (value, item) => {
    const temp = [...eventData];
    if (value) {
      const newContent = { ...item, process: value };
      const changeIndex = temp.findIndex(v => v.id === item.id);
      if (changeIndex !== -1) {
        temp.splice(changeIndex, 1, newContent);
      }
      setEventData(temp);
    }
  };

  return (
    <div className={styles['list-content']}>
      <Row>
        <span className={styles['list-title']}>{title}</span>
        <img src={AddImg} alt="add-event" onClick={onAddBtnClick} />
      </Row>
      <Row>
        {eventData.map((item, index) => (
          <Row className={styles['event-card']} key={item.id}>
            <Col span={19}>
              <Input.TextArea
                value={
                  editId === item.id ? newValue || item.content : item.content
                }
                placeholder={'请输入工作内容'}
                onChange={e => handleValue(e, item)}
                style={{ marginRight: 10 }}
                onFocus={() => onInputFocus(item)}
                onBlur={e => onInputBlur(e, item)}
                autoSize
              />
            </Col>
            <Col
              span={5}
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                minWidth: 70,
              }}
            >
              <ProcessBar
                id={item.id}
                onProcessChange={val => onProcessChange(val, item)}
              />
              <div>
                <img
                  src={DeleteIcon}
                  alt=""
                  onClick={() => onDeleteClick(item)}
                  className={styles['delete-icon']}
                />
              </div>
            </Col>
          </Row>
        ))}
      </Row>
    </div>
  );
}

export default forwardRef(EventList);
