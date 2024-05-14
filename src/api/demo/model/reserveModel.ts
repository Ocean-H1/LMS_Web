import { BasicFetchResult } from '@/api/model/baseModel';
import { DeviceItem } from './deviceModel';

export interface LabListItem {
  lab_id: number;
  lab_name: string;
  location: string;
  capacity: number;
  responsible_person: string;
  devices: DeviceItem[];
}
// Request List Return Value
export type LabListGetResultModel = BasicFetchResult<LabListItem>;
