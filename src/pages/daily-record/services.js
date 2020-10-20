import { noAuthAxios } from '@/utils/axios';

/**
 * 提交记录
 * @param {*} params
 */
export function createDailyRecord(options) {
  const { code, ...rest } = options;
  return noAuthAxios({
    method: 'post',
    url: 'api/daily',
    params: { code },
    data: { ...rest },
  });
}

/**
 * 查询今日是否填写
 * @param {*} params
 */
export function queryDailyStatus(code) {
  return noAuthAxios({
    method: 'get',
    url: `/daily/isUpdate?code=${code}`,
  });
}
