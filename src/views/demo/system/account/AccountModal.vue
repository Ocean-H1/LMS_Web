<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { accountFormSchema } from './account.data';
  import { createAccountApi, editAccountApi } from '@/api/demo/account';
  import { useMessage } from '@/hooks/web/useMessage';
  // import { getDeptList } from '@/api/demo/system';

  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');
  const userId = ref(0);

  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      userId.value = data.record.userId;
      setFieldsValue({
        ...data.record,
      });
    }

    // const treeData = await getDeptList();
    // updateSchema([
    //   {
    //     field: 'pwd',
    //     show: !unref(isUpdate),
    //   },
    //   {
    //     field: 'dept',
    //     componentProps: { treeData },
    //   },
    // ]);
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

  async function handleSubmit() {
    const { createMessage } = useMessage();
    try {
      console.log('userId => ', userId.value);

      const params = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      if (unref(isUpdate)) {
        await editAccountApi({
          ...params,
          userId: userId.value,
        });
        createMessage.success('更新成功!');
      } else {
        await createAccountApi(params);
        createMessage.success('添加账号成功!');
      }

      closeModal();
      emit('success', {
        isUpdate: unref(isUpdate),
        values: { ...params, id: rowId.value, userId: userId.value },
      });
    } catch (err) {
      createMessage.error(err);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
