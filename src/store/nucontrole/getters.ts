import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  },

  allRegisters(state): Array<object> {
    return state.registers
  },

  totalIncome(state) {
    let total = state.registers
    .filter(item => item.type === 'Receita')
    .reduce((acc, item) => acc += item.value ?? 0, 0)
    return total
  },

  totalExpenses(state) {
    let total = state.registers
    .filter(item => item.type === 'Despesa')
    .reduce((acc, item) => acc += item.value ?? 0, 0)
    return total
  },

  totalBalance(state, getters) {
    let total = getters.totalIncome - getters.totalExpenses
    return total
  },

  currentType(state): string {
    return state.currentType
  },

  currentPeriod(state): object {
    return state.period
  },

  getTotalPerCategory(state): Array<object> {
    return state.totalPerCategory
  },

  getTotalPerStatus(state): Array<object> {
    return state.totalPerStatus
  }

};

export default getters;
