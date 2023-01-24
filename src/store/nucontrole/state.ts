import { Period, Registers } from 'src/models/models';

export interface ExampleStateInterface {
  registers: Array<Registers>;
  currentType: string;
  period: Period;
  totalPerCategory: Array<object>;
  totalPerStatus: Array<object>;
}

function state(): ExampleStateInterface {
  return {
    registers: [],
    currentType: 'Despesa',
    period: {
      month: null,
      year: null
    },
    totalPerCategory: [],
    totalPerStatus: []
  }
};

export default state;
