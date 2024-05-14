<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <!-- class="w-3/4 xl:w-4/5" -->
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <!-- <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
      </template> -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '预 约',
                type: 'primary',
                onClick: handleReserve.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getLabListApi } from '@/api/demo/reserve';
  import { PageWrapper } from '@/components/Page';

  import { useModal } from '@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './reserve.data';
  import { useUserStore } from '@/store/modules/user';

  defineOptions({ name: 'AccountManagement' });

  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload }] = useTable({
    title: '实验室列表',
    api: getLabListApi,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn(info) {
      console.log('handleSearchInfoFn', info);
      return info;
    },
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
    },
  });
  const userStore = useUserStore();

  // 预约
  async function handleReserve(record) {
    const { user_id } = userStore.getUserInfo;

    openModal(true, {
      record,
      userId: user_id,
    });
  }

  // function handleCreate() {
  //   openModal(true, {
  //     isUpdate: false,
  //   });
  // }

  // function handleEdit(record: Recordable) {
  //   console.log(record);
  //   openModal(true, {
  //     record,
  //     isUpdate: true,
  //   });
  // }

  // async function handleDelete(record: Recordable) {
  //   try {
  //     const { isDelete } = await deleteAccountApi({
  //       userId: record.userId,
  //     });

  //     isDelete ? createMessage.success('删除成功!') : createMessage.error('删除失败!');
  //   } finally {
  //     reload();
  //   }
  // }

  function handleSuccess({ isUpdate, values }) {
    // if (isUpdate) {
    //   // 演示不刷新表格直接更新内部数据。
    //   // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
    //   const result = updateTableDataRecord(values.id, values);
    //   console.log(result);
    //   // console.log('values=>', values);
    // } else {
    //   reload();
    // }
    reload();
  }

  // function handleSelect(deptId = '') {
  //   searchInfo.deptId = deptId;
  //   reload();
  // }

  // function handleView(record: Recordable) {
  //   go('/system/account_detail/' + record.username);
  // }
</script>
