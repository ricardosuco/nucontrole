import { Period } from 'src/models/models';
interface Registers {
  id?: number;
  type?: string;
  description?: string;
  value?: number;
  created_at?: string;
  category?: string;
  status?: string;
  user_id?: string;
  month?: string;
  year?: string;
}
export interface ExampleStateInterface {
  registers: Array<Registers>;
  currentType: string;
  period: Period;
}

function state(): ExampleStateInterface {
  return {
    registers: [],
    currentType: 'Despesa',
    period: {
      month: null,
      year: null
    }
  }
};

export default state;
