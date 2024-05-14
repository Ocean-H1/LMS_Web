export interface DeviceItem {
  device_id: number;
  device_name: string;
  status: 'idle' | 'in_use' | 'under_maintenance';
}
