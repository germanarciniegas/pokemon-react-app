import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import App from "./App.js";

it('renders Pokemon logo', () => {
  render(<App />);
  const pokemonLogo = screen.getByAltText('poke-logo');
  expect(pokemonLogo).toBeInTheDocument();
});

it('input for filtering Pokémon works correctly', () => {
  render(<App />);
  const filterInput = screen.getByPlaceholderText('Please Insert to Filter Id or Name');
  fireEvent.change(filterInput, { target: { value: 'pikachu' } });
  expect(filterInput.value).toBe('pikachu');
});

it('renders loading message', () => {
  const fakeData = { resultado: 'api llamada poke api' };
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(fakeData),
  });
  render(<App />);
  const loadingElement = screen.getByText(/loading/i);
  expect(loadingElement).toBeInTheDocument();
});

it('debería llamar a fetch y mostrar los resultados al incio', async () => {
  const fakeData = { resultado: 'api llamada poke api' };
  const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(fakeData),
  });
  render(<App />);
  expect(fetchSpy).toHaveBeenCalled();
});

it('displays an error message when fetching pokemons fails', async () => {
  // mock fetchPokes function to throw an error
  global.fetch = jest.fn().mockRejectedValue(new Error('fetch error'));

  // render the app
  render(<App />);

  // wait for the error message to be displayed
  await waitFor(() => expect(screen.getByText(/Error:/)).toBeInTheDocument());
  expect(screen.getByText(/Error: fetch error/)).toBeInTheDocument();
});

