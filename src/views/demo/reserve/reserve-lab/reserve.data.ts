import { getAllRoleList } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
// 序号 实验室号 地点 容纳人数 设备信息 操作
export const columns: BasicColumn[] = [
  {
    title: '实验室号',
    dataIndex: 'lab_name',
    width: 150,
  },
  {
    title: '地点',
    dataIndex: 'location',
    width: 250,
  },
  {
    title: '负责人',
    dataIndex: 'responsible_person',
    width: 150,
  },
  {
    title: '可容纳人数',
    dataIndex: 'capacity',
    width: 180,
  },
  {
    title: '设备信息',
    dataIndex: 'devices',
    format(value, record, index) {
      const deviceNameList = record.devices.map((device) => device.device_name);
      return deviceNameList.join('、');
    },
    width: 250,
  },
  // {
  //   title: '开放时间',
  //   dataIndex: 'time',
  //   width: 250,
  // },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'lab_name',
    label: '实验室号',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    // helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      // {
      //   trigger: 'blur',
      //   validator(_, value) {
      //     return new Promise((resolve, reject) => {
      //       if (!value) return resolve();
      //       isAccountExist(value)
      //         .then(resolve)
      //         .catch((err) => {
      //           reject(err.message || '验证失败');
      //         });
      //     });
      //   },
      // },
    ],
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    // ifShow: false,
  },
  {
    label: '角色',
    field: 'role_name',
    component: 'ApiSelect',
    componentProps: {
      showSearch: true,
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    required: true,
  },
  // {
  //   field: 'dept',
  //   label: '所属学院',
  //   component: 'TreeSelect',
  //   componentProps: {
  //     fieldNames: {
  //       label: 'deptName',
  //       value: 'id',
  //     },
  //     getPopupContainer: () => document.body,
  //   },
  //   required: true,
  // },
  // {
  //   field: 'nickname',
  //   label: '昵称',
  //   component: 'Input',
  //   required: true,
  // },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  // {
  //   label: '备注',
  //   field: 'remark',
  //   component: 'InputTextArea',
  // },
];

// 可选择时间段
export const period_time = [
  {
    label: '早上1-2节',
    value: '1',
  },
  {
    label: '早上3-4节',
    value: '2',
  },
  {
    label: '下午5-6节',
    value: '3',
  },
  {
    label: '下午7-8节',
    value: '4',
  },
  {
    label: '晚上19点之后',
    value: '5',
  },
];

export const labFormSchema: FormSchema[] = [
  {
    label: '日期: ',
    field: 'date_time',
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY年MM月DD日',
      valueFormat: 'YYYY-MM-DD',
    },
    required: true,
  },
  {
    label: '时间段: ',
    field: 'period_time',
    component: 'Select',
    componentProps: {
      options: period_time,
    },
    required: true,
  },
  {
    label: '使用人数: ',
    field: 'user_num',
    component: 'Input',
    rules: [
      { required: true, message: '请输入使用人数', trigger: 'blur' },
      // {
      //   validator: (rule, value, callback) => {
      //     // 确保value是数字类型，并且大于10
      //     if (!Number.isInteger(value) || value <= 10) {
      //       callback('使用人数必须大于10人');
      //     } else {
      //       callback();
      //     }
      //   },
      //   trigger: 'change', // 也可以考虑使用'change'或同时使用两者
      // },
    ],
  },
];
