/** * @Description: 日志上传组件 * @Author: OceanH * @Date: 2024-04-25 15:56:21 */
<template>
  <PageWrapper title="日志上传">
    <CollapseContainer title="编辑日志">
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        :baseColProps="{ span: 24 }"
        :submitButtonOptions="{ text: '提交' }"
        @submit="handleSubmit"
      />
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { h } from 'vue';
  import { BasicForm, FormSchema } from '@/components/Form';
  import { CollapseContainer } from '@/components/Container';
  import { useMessage } from '@/hooks/web/useMessage';
  import { Tinymce } from '@/components/Tinymce';
  import { PageWrapper } from '@/components/Page';
  import { logUpload } from '@/api/demo/system';

  const schemas: FormSchema[] = [
    {
      field: 'title',
      component: 'Input',
      label: '标题: ',
      defaultValue: '我是标题',
      rules: [{ required: true }],
    },
    {
      field: 'content',
      component: 'Input',
      label: '内容: ',
      defaultValue: '我是内容',
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(Tinymce, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
        });
      },
    },
  ];
  const { createMessage } = useMessage();

  async function handleSubmit(values: any) {
    const { log_title } = await logUpload(values);

    log_title
      ? createMessage.success(`日志:《${log_title}》提交成功!`)
      : createMessage.error('日志提交失败!');
  }
</script>
