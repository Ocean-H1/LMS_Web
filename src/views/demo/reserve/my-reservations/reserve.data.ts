import { BasicColumn, FormSchema } from '@/components/Table';

export const periodTimeMap = ['早上1-2节', '早上3-4节', '下午5-6节', '下午7-8节', '晚上19点之后'];

export const columns: BasicColumn[] = [
  {
    title: '预约实验室',
    dataIndex: 'lab_name',
    width: 150,
  },
  {
    title: '预约地点',
    dataIndex: 'location',
    width: 250,
  },
  {
    title: '日期',
    dataIndex: 'date_time',
    width: 150,
  },
  {
    title: '时间',
    dataIndex: 'period_time',
    format(text, record, index) {
      return periodTimeMap[+text - 1];
    },
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    format(text, record, index) {
      if (text === 'succeeded') {
        return '预约成功';
      } else {
        return '已取消';
      }
    },
    width: 150,
  },
];

// export const searchFormSchema: FormSchema[] = [
//   {
//     field: 'lab_name',
//     label: '实验室号',
//     component: 'Input',
//     colProps: { span: 8 },
//   },
// ];

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
