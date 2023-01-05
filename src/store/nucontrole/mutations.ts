import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  someMutation (/* state: ExampleStateInterface */) {
    // your code
  },

  SET_REGISTERS(state, registers): void {
    state.registers = registers
  }

};

export default mutation;
