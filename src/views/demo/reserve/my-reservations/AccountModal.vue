<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleReserve">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { labFormSchema } from './reserve.data';
  // import { createAccountApi, editAccountApi } from '@/api/demo/account';
  import { judgeReserveApi, createReservationApi } from '@/api/demo/reserve';
  import { useMessage } from '@/hooks/web/useMessage';
  // import { getDeptList } from '@/api/demo/system';

  defineOptions({ name: 'AccountModal' });

  // const isUpdate = ref(true);
  const rowId = ref('');
  const userId = ref(0);
  const labId = ref(0);

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: labFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    setModalProps({ confirmLoading: false });

    rowId.value = data.record.id;
    userId.value = data.userId;
    labId.value = data.record.lab_id;
  });

  const getTitle = computed(() => '预约');

  async function handleReserve() {
    const { createMessage } = useMessage();
    try {
      const params = await validate();

      setModalProps({ confirmLoading: true });

      // 判断是否可预约
      const { isAvailable, reason } = await judgeReserveApi({
        ...params,
        lab_id: labId.value,
      });

      if (!isAvailable) {
        return createMessage.error(reason);
      }

      // 创建预约
      const { reservation_id } = await createReservationApi({
        period_time: params.period_time,
        date_time: params.date_time,
        user_id: userId.value,
        lab_id: labId.value,
      });

      closeModal();
      if (reservation_id) {
        return createMessage.success('预约成功!');
      }
      return createMessage.error('预约失败!');
    } catch (error) {
      return createMessage.error(error);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
../reserve-lab/reserve.data
