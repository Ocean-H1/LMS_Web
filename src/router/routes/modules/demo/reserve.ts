import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const reserve: AppRouteModule = {
  path: '/reservation',
  name: 'reservationManagement',
  component: LAYOUT,
  meta: {
    orderNo: 3,
    icon: 'ion:settings-outline',
    title: t('routes.demo.reserve.moduleName'),
  },
  children: [
    {
      path: 'reserve',
      name: 'reserveLab',
      meta: {
        title: t('routes.demo.reserve.reserveLab'),
      },
      component: () => import('@/views/demo/reserve/reserve-lab/index.vue'),
    },
    {
      path: 'myReservations',
      name: 'myReservations',
      meta: {
        title: t('routes.demo.reserve.myReservations'),
      },
      component: () => import('@/views/demo/reserve/my-reservations/index.vue'),
    },
  ],
};

export default reserve;
