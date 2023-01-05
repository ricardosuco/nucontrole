interface Registers {
  id?: number;
  type?: string;
  description?: string;
  value?: number;
  created_at?: string;
  category?: string;
  status?: string;
  user_id?: string;
}

export interface ExampleStateInterface {
  registers: Array<Registers>;

}

function state(): ExampleStateInterface {
  return {
    registers: []
  }
};

export default state;
