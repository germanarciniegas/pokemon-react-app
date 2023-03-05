import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App, {urlListPokemons} from '../App';

const results = [
  {"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/detail"},
  {"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/detail"},
  {"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/detail"},
  {"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/detail"},
  {"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/detail"},
  {"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/detail"},
];
const totalNumberOfPokes = '1279';

const server = setupServer(
  rest.get(urlListPokemons(), (req, res, ctx) => {
    return res(ctx.json({
      "count": totalNumberOfPokes,
      "next":"https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
      "previous":null,
      "results": results
    }))
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/detail", (req, res, ctx) => {
    return res(ctx.json({
      "abilities":[
        {"ability":{"name":"shield-dust","url":"https://pokeapi.co/api/v2/ability/19/"},"is_hidden":false,"slot":1},
        {"ability":{"name":"run-away","url":"https://pokeapi.co/api/v2/ability/50/"},"is_hidden":true,"slot":3}
      ],
      "base_experience":39,
      "forms":[
        {"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon-form/10/"}
      ],
      "game_indices":[
        {"game_index":123,"version":{"name":"red","url":"https://pokeapi.co/api/v2/version/1/"}},
        {"game_index":123,"version":{"name":"blue","url":"https://pokeapi.co/api/v2/version/2/"}},
        {"game_index":123,"version":{"name":"yellow","url":"https://pokeapi.co/api/v2/version/3/"}},
        {"game_index":10,"version":{"name":"gold","url":"https://pokeapi.co/api/v2/version/4/"}}
      ],
      "height":3,
      "sprites": {"front_default": "https://pokeapi.co/img"},
      "held_items":[],
      "id":10,
      "name": "Pokename",
      "is_default":true,
      "location_area_encounters":"https://pokeapi.co/api/v2/pokemon/10/encounters",
      "weight":29,
      "types": [
          {"type":{"name":"fire"}}
        ]
      }))
  }),
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
beforeEach(()=>jest.spyOn(console, 'error').mockImplementation(() => {}))


describe('Pokemon App Behaviur', () => {
  describe('App should display everything correctly before interaction', () => {
    beforeEach(() =>  render(<App />));

    it('should display pokemon logo', async () => {
      const logo = screen.queryByAltText('poke-logo');
      expect(logo).toBeInTheDocument();
    });

    it('should display search input id/name poke', async () => {
      const searchBar = screen.getByPlaceholderText('Please Insert to Filter Id or Name');
      expect(searchBar).toBeInTheDocument();
    });

    it('should display selector abilities', async () => {
      const selector = document.querySelector('#demo-multiple-checkbox');;
      expect(selector).toBeInTheDocument();
    });

    it('should display total number of pokes', async () => {
      await waitFor(() => screen.getByRole('heading'));
      expect(screen.getByRole('heading')).toHaveTextContent('Total number of Pokes 1279');
    });

    it('should display page size selector', async () => {
      const selectorSize = document.querySelector('#limitInput');;
      expect(selectorSize).toBeInTheDocument();
    });

    it('should display page change selector', async () => {
      const inputNumberPage = document.querySelector('#pageInput');;
      expect(inputNumberPage).toBeInTheDocument();
    });

    it('should display container list pokes', async () => {
      const mainContainerPokes = document.querySelector('.main-container');;
      expect(mainContainerPokes).toBeInTheDocument();
    });

    it('should display Loading  when no loading', async () => {
      const mainContainerPokes = screen.getByText(/Loading/i);
      expect(mainContainerPokes).toBeInTheDocument();
    });

    it('should display previus button paggination ', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const previousButton = screen.getByText(/Previous/i);
      expect(previousButton).toBeInTheDocument();
    });

    it('should display container next button paggination ', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const nextButton = screen.getByText(/Next/i);
      expect(nextButton).toBeInTheDocument();
    });

    it('should display labels paggination below ', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const labelPages = screen.getByText(/Page 1 of/i);
      expect(labelPages).toBeInTheDocument();
    });
  });

  describe('App should show all Pokes fisrt view', () => {
    beforeEach(() =>  render(<App />));
    it('should all pokes in the first view/sized', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const allPokesList = document.querySelectorAll('li').length;
      expect(allPokesList).toBe(6);
    });
    it('should show the correct size of pokes by page', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const allPokesList = document.querySelectorAll('li').length;
      const maximunPokesPerPages = document.querySelector('#limitInput').value;
      expect(allPokesList).toBe(6);
      expect(allPokesList < maximunPokesPerPages).toBeTruthy();
    });
    it('should show the fisrt page number', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const labelPages = screen.getByText(/Page 1 of/i);
      const currentPage = document.querySelector('#pageInput').value;
      expect(currentPage).toBe("1");
      expect(labelPages).toBeInTheDocument();
    });
    it('should show the correct total number of pokes', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const allPokesList = document.querySelectorAll('li').length;
      expect(allPokesList).toBe(results.length);
    });
    it('should show image by pokemon', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const imagePokemonOnList = document.querySelector('li img');
      expect(imagePokemonOnList).toBeInTheDocument();
    });
    it('should show id by pokemon', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const idPokemon = document.querySelector('li .id-detail');
      expect(idPokemon).toBeInTheDocument();
    });
    it('should show name by pokemon', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const namePokemon = document.querySelector('li button').innerHTML;
      expect(namePokemon).toBe("Pokename");
    });
    it('should show a button to click for detailing', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const idPokemon = document.querySelector('li button');
      expect(idPokemon).toBeInTheDocument();
    });
  });

  describe('Paggination', () => {
    beforeEach(() =>  render(<App />));

    it('should show Page 1 of ', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const labelPages = screen.getByText(/Page 1 of/i);
      expect(labelPages.innerHTML).toBe("Page 1 of 64");
    });

    it('should show correct number of pages  ', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const labelPages = screen.getByText(/Page 1 of/i);
      const size = document.querySelector('#limitInput').value;
      const pagesShouldShow = Math.ceil(totalNumberOfPokes/size);
      expect(labelPages).toHaveTextContent(pagesShouldShow.toString());
    });

    it('when click next should go to next page  ', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const nextButton = screen.getByText(/Next/i);
      fireEvent.click(nextButton);
      await waitFor(() => screen.getByText(/Page 2 of/i));
      expect(screen.getByText(/Page 2 of/i)).toBeInTheDocument();
    });
    it('when click previus should go to previus page  ', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const nextButton = screen.getByText(/Next/i);
      fireEvent.click(nextButton);
      await waitFor(() => screen.getByText(/Page 2 of/i));
      expect(screen.getByText(/Page 2 of/i)).toBeInTheDocument();
      const previousButton = screen.getByText(/Previous/i);
      fireEvent.click(previousButton);
      await waitFor(() => screen.getByText(/Page 1 of/i));
      expect(screen.getByText(/Page 1 of/i)).toBeInTheDocument();
    });
    it('when select size page pokes need to change according that', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const selectorSize = document.querySelector('#limitInput');
      fireEvent.change(selectorSize, {target: {value: '20'}});
      expect(selectorSize.value).toBe('20');
    });
    it('previus button should be disable in fisrt page', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const previousButton = screen.getByText(/Previous/i);
      expect(previousButton).toHaveAttribute("disabled");
    });
    it('When select last page should go to loading and not show error', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const inputNumberPage = document.querySelector('#pageInput');
      fireEvent.change(inputNumberPage, {target: {value: '64'}});
      await waitFor(() => screen.getByText(/Loading.../i));
      const loading = screen.getByText(/Loading.../i);
      expect(loading).toBeInTheDocument();
    });
  });

  describe('should Filter changing input text', () => {
    beforeEach(() =>  render(<App />));
    it('when search change filter by id', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const searchBar = screen.getByPlaceholderText('Please Insert to Filter Id or Name');
      fireEvent.change(searchBar, {target:{value: "99999"}});
      await waitFor(() => screen.getByText(/Disculpanos pero el Id/i));
    });
    it('when search change filter by name', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const searchBar = screen.getByPlaceholderText('Please Insert to Filter Id or Name');
      fireEvent.change(searchBar, {target:{value: "No name"}});
      await waitFor(() => screen.getByText(/Disculpanos pero el Id/i));
    });
    it('when search change filter and this fit some pokes', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const searchBar = screen.getByPlaceholderText('Please Insert to Filter Id or Name');
      fireEvent.change(searchBar, {target:{value: "10"}});
      await waitFor(() => document.querySelectorAll('li').length);
      const allPokesList = document.querySelectorAll('li').length;
      expect(allPokesList).toBe(6);
    });
  });

  describe('when error api', () => {
    it('When API hit an error', async () => {
      server.use(
        rest.get(urlListPokemons(), (req, res, ctx) => {
          return res(ctx.status(500))
        }),
      )
      render(<App />);
      await waitFor(() => expect(screen.getByText(/Error:/)).toBeInTheDocument());
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  describe('should show detailed pokemon when click', () => {
    beforeEach(() =>  render(<App />));
    it('when select a pokemon should see the detail', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const detailPokemonButton = document.querySelector('li button');
      fireEvent.click(detailPokemonButton);
      await waitFor(() => screen.getByText(/Selection/i));
      expect(screen.getByText(/Selection/i)).toBeInTheDocument();
    });
    it('when select a pokemon should display Height, Weight, Experience and Type', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const detailPokemonButton = document.querySelector('li button');
      fireEvent.click(detailPokemonButton);
      await waitFor(() => screen.getByText(/Selection/i));
      expect(screen.getByText(/experience/i)).toBeInTheDocument();
      expect(screen.getByText(/weight/i)).toBeInTheDocument();
      expect(screen.getByText(/Height/i)).toBeInTheDocument();
      expect(screen.getByText(/type/i)).toBeInTheDocument();
    });
    it('when select a pokemon should display the correct pokemon', async () => {
      await waitFor(() => screen.getByRole('heading'));
      const detailPokemonButton = document.querySelector('li button');
      fireEvent.click(detailPokemonButton);
      await waitFor(() => screen.getByText(/Selection/i));
      const selectedName = detailPokemonButton.innerHTML;
      const nameShowed = document.querySelectorAll('h2')[1].innerHTML;
      expect(selectedName).toBe(nameShowed);
    });
  });
});