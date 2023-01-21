import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  someMutation (/* state: ExampleStateInterface */) {
    // your code
  },

  SET_REGISTERS(state, registers): void {
    state.registers = registers
  },

  SET_CURRENT_TYPE(state, currentType): void {
    state.currentType = currentType
  },

  SET_PERIOD(state, period): void {
    state.period = period
  }

};

export default mutation;
