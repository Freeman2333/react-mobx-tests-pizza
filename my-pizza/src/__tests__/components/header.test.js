import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterMobx } from '../../test-utils';
import Header from '../../components/header.component';

describe('Header Component', () => {
  it('should render with Redux cart state', () => {
    const { container } = renderWithRouterMobx(<Header />, {
      store: {
        cart: {
          totalPrice: 1375,
          totalCount: 5,
        },
      },
    });

    // expect(screen.getByText('React Pizza')).toBeInTheDocument();
  });
});
