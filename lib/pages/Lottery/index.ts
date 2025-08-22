import Lottery from './Lottery.vue';

export default Lottery;

export const meta = {
  actions: [
    {
      label: '抽奖',
      name: 'lottery',
      dataType: 'string',
    },
  ],
} as const;


