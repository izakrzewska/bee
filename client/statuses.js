const availableStatuses = [
  {
    id: 'noQueen',
    name: 'Brak królowej',
    disabledWhen: 'weakQueen',
  },
  {
    id: 'weakQueen',
    name: 'Słaba królowa',
    disabledWhen: 'noQueen',
  },
  {
    id: 'hungry',
    name: 'Głodny',
    disabledWhen: '',
  },
  {
    id: 'layingWorker',
    name: 'Trutówka',
    disabledWhen: '',
  },
];

export default availableStatuses;
