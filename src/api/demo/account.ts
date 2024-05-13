import { defHttp } from '@/utils/http/axios';
import { GetAccountInfoModel } from './model/accountModel';

enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  TOKEN_EXPIRED = '/user/tokenExpired',
  CREATE_ACCOUNT = '/account/createAccount',
  EDIT_ACCOUNT = '/account/editAccount',
  DELETE_ACCOUNT = '/account/deleteAccount',
}

export function createAccountApi(params) {
  return defHttp.post<{ userId: string | number }>({ url: Api.CREATE_ACCOUNT, data: params });
}

export function editAccountApi(params) {
  return defHttp.post<{ userId?: number }>({ url: Api.EDIT_ACCOUNT, data: params });
}

export function deleteAccountApi(params) {
  return defHttp.post<{ userId: number; isDelete: boolean }>({
    url: Api.DELETE_ACCOUNT,
    data: params,
  });
}

// Get personal center-basic settings
export const accountInfoApi = () => defHttp.get<GetAccountInfoModel>({ url: Api.ACCOUNT_INFO });

export const sessionTimeoutApi = () => defHttp.post<void>({ url: Api.SESSION_TIMEOUT });

export const tokenExpiredApi = () => defHttp.post<void>({ url: Api.TOKEN_EXPIRED });
