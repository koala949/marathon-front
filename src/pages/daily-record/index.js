import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Button, Notification } from 'antd';
import moment from 'moment';
import Loading from '../components/loading';
import styles from './index.less';
import EventList from '../components/event-list';
import DoneRender from '../components/done-page';
import { createDailyRecord, queryDailyStatus } from './services';

export default function Event(props) {
  const dynamicFormsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const { code } = props.location.query;
  const [isDone, setIsDone] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    (async function(code) {
      if (code) {
        const { data } = await queryDailyStatus(code);
        if (data) {
          setIsDone(true);
        }
      }
      setPageLoading(false);
    })();
  }, [code]);

  const eventCompList = [
    {
      title: '今日工作进展',
      initCount: 2,
      compId: 1,
    },
    {
      title: '明日计划',
      initCount: 1,
      compId: 2,
    },
    {
      title: '需要协调的工作',
      initCount: 1,
      compId: 3,
    },
  ];
  dynamicFormsRef.current = eventCompList.map(one => React.createRef());

  const onSubmit = async isHoliday => {
    setLoading(true);
    if (code) {
      Notification.error({
        message: '抱歉,找不到用户信息~',
        placement: 'bottomRight',
      });
      return;
    }
    const inputData = { isHoliday: isHoliday ? 1 : 0, code: code };
    if (!isHoliday) {
      dynamicFormsRef.current.forEach((item, index) => {
        const eventData = item.current.eventData;
        const result = eventData
          .filter(v => v.content)
          .map(v => {
            if (v) {
              const { id, ...rest } = v;
              return rest;
            }
          });

        Object.assign(inputData, {
          [`text${index + 1}`]: result,
        });
      });
    }
    const { success, msg } = await createDailyRecord(inputData);
    if (!success) {
      Notification.error({ message: msg, placement: 'bottomRight' });
      setLoading(false);
      return;
    }
    setLoading(false);
    setIsDone(true);
  };

  const contentRender = () => {
    return (
      <>
        <div className={styles.header}>
          <Row className={styles.title}>今日日报--黄小鸭</Row>
          <Row className={styles['sub-title']}>
            <Col className={styles.time}>{moment().format('yyyy-MM-DD')}</Col>
            <Button
              type="primary"
              className={styles['off-day']}
              onClick={() => onSubmit(true)}
            >
              今天请假! 日报pass
            </Button>
          </Row>
        </div>
        <div>
          {eventCompList.map((item, index) => (
            <EventList
              key={item.compId}
              comp={item}
              ref={dynamicFormsRef.current[index]}
            />
          ))}
        </div>
        <div className={styles['submitBtn']}>
          <Button
            type="primary"
            loading={loading}
            className={styles['btn']}
            onClick={() => onSubmit(false)}
          >
            提交日报
          </Button>
        </div>
      </>
    );
  };
  return (
    <div className={styles.container}>
      {pageLoading ? (
        <Loading />
      ) : (
        <div className={styles.content}>
          {isDone ? <DoneRender /> : contentRender()}
        </div>
      )}
    </div>
  );
}
