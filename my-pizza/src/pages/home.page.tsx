import React, { useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { IPizzasBlockNewObject, IPizzasStore } from '../types/pizzas.type';
import {
  Categories,
  ErrorIndicator,
  PizzaBlock,
  PizzaLoadingBlock,
  SortPopup,
} from '../components';
import { IFiltersSortByState, IFiltersStore } from '../types/filters.type';
import { ICartStore } from '../types/cart.types';

export interface ISortItems {
  name: string;
  type: string;
  order: string;
}

interface IHome {
  pizzas?: IPizzasStore;
  filter?: IFiltersStore;
  cart?: ICartStore;
}

export const categoryNames: string[] = [
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];
export const sortItems: ISortItems[] = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавит', type: 'name', order: 'asc' },
];

const Home: React.FC<IHome> = inject(
  'pizzas',
  'filter',
  'cart'
)(
  observer((props: IHome) => {
    const { items, isLoaded, error, fetchPizzas } =
      props.pizzas as IPizzasStore;
    const { category, sortBy } = props.filter as IFiltersStore;
    const { items: cartItems } = props.cart as ICartStore;

    useEffect(() => {
      fetchPizzas(sortBy, category);
    }, [sortBy, category]);

    const onSelectCategory = useCallback((index: number | null) => {
      props.filter!.setCategory(index as number);
    }, []);

    const onSelectSortType = useCallback((type: IFiltersSortByState) => {
      props.filter!.setSortBy(type);
    }, []);

    const handleAddPizzaToCart = useCallback(
      (newObj: IPizzasBlockNewObject) => {
        props.cart!.addPizzaToCart(newObj);
      },
      []
    );

    const countPizzaOnId = (id: number) => {
      return cartItems.reduce((sum, item) => {
        return item.id === id ? sum + item.countItem : sum;
      }, 0);
    };

    return (
      <div className="container">
        <div className="content__top">
          <Categories
            activeCategory={category}
            onClickCategory={onSelectCategory}
            items={categoryNames}
          />
          <SortPopup
            activeSortType={sortBy.type}
            items={sortItems}
            onClickSortType={onSelectSortType}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>

        {error.length ? (
          <ErrorIndicator>{error}</ErrorIndicator>
        ) : (
          <div className="content__items">
            {isLoaded
              ? items.map((obj) => (
                  <PizzaBlock
                    onClickAddPizza={handleAddPizzaToCart}
                    key={obj.id}
                    addedCount={countPizzaOnId(obj.id)}
                    {...obj}
                  />
                ))
              : Array(12)
                  .fill(0)
                  .map((_, index) => <PizzaLoadingBlock key={index} />)}
          </div>
        )}
      </div>
    );
  })
);

export default Home;
