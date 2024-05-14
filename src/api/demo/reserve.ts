import { defHttp } from '@/utils/http/axios';
import { LabListGetResultModel } from './model/reserveModel';

enum Api {
  LabList = '/lab/getLabList',
  CreateReservation = '/reserve/createReservation',
  JudgeReserve = '/reserve/judgeReserve',
  GetReservationsById = '/reserve/getReservationListById',
}

export const getLabListApi = (params) => {
  return defHttp.get<LabListGetResultModel>({ url: Api.LabList, params });
};

export function createReservationApi(params) {
  return defHttp.post<{ reservation_id: number }>({ url: Api.CreateReservation, data: params });
}

export function judgeReserveApi(params) {
  return defHttp.post<{ isAvailable: boolean; reason?: string }>({
    url: Api.JudgeReserve,
    data: params,
  });
}

export const getReservationListById = (params) => {
  return defHttp.get({ url: Api.GetReservationsById, params });
};
