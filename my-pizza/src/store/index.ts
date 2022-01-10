import PizzasStore from './pizzas.store';

import { IPizzasStore } from '../types/pizzas.type';
import CartStore from './cart.store';
import { ICartStore } from '../types/cart.types';
import FilterStore from './filters.store';
import { IFiltersStore } from '../types/filters.type';

export interface IRootStore {
  [key: string]: IPizzasStore | ICartStore | IFiltersStore;
}

export const rootStore: IRootStore = {
  pizzas: new PizzasStore(),
  cart: new CartStore(),
  filter: new FilterStore(),
};
