import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { mocks } from './mocks';

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: jest.fn(),
}));

describe('Pokedex tests', () => {
  test('Should render list correctly with test data', () => {
    const { queryByText } = render(<MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>);

    expect(queryByText('Bulbasaur')).not.toBeFalsy();
    expect(queryByText('Charizard')).not.toBeFalsy();
  });
  test('Should render abbreviated list with search field', () => {
    const { getByTestId, queryByText } = render(<MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>);

    const searchField = getByTestId('search-field');
    fireEvent.change(searchField, {target: {value: 'Ivy'}});
    expect(queryByText('Bulbasaur')).toBeFalsy();
    expect(queryByText('Ivysaur')).not.toBeFalsy();
  });
  test('Should render modal when user clicks row', async () => {
    const { getByTestId, queryByTestId } = render(<MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>);

    const row = getByTestId('pokemon-row-Bulbasaur');
    fireEvent.click(row);

    await waitFor(() => expect(queryByTestId('modal-types-section')).not.toBeFalsy());

    expect(queryByTestId('modal-types-section')).toBeFalsy();
    expect(queryByTestId('modal-resistance-section')).not.toBeFalsy();
    expect(queryByTestId('modal-weakness-section')).not.toBeFalsy();
  });
  test('Should render modal from route', async () => {
    const { getByTestId, queryByTestId } = render(<MockedProvider mocks={mocks}>
      <MemoryRouter initialEntries={['pokemon/name/Bulbasaur']}>
        <App />
      </MemoryRouter>
    </MockedProvider>);

    await waitFor(() => expect(queryByTestId('modal-types-section')).not.toBeFalsy());

    expect(queryByTestId('modal-types-section')).toBeFalsy();
    expect(queryByTestId('modal-resistance-section')).not.toBeFalsy();
    expect(queryByTestId('modal-weakness-section')).not.toBeFalsy();
  });
});