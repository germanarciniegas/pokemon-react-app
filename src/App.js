import React, { useState, useEffect } from 'react';
import { Input } from '@mui/material';
import Bubles from './components/Bubles';
import MultipleSelect from './components/MultipleSelect';
import axios from 'axios';
import { DetailPoke, List, Pagination } from './components/styledComponents/components';
import PokeSmallCard from './components/PokeSmallCard';

export const urlListPokemons = () => `https://pokeapi.co/api/v2/pokemon`;

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [availableAbilities, setAvailableAbilities] = useState([]);
  const [filterAbilities, setFilterAbilities] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({"count": null});

  const fetchPokemons = async (offset, limit) =>
    axios
      .get(urlListPokemons(),{
        params: { offset, limit }
      })
      .then(response => {
        const {data} = response;
        const {count, results} = data;
        setData({"count": count});
        setTotalPages(Math.ceil(count / limit));
        setPokemonList([]);
        detailPokemons(results);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      })

  useEffect(() => {
    setLoading(true);
    const offset = (page - 1) * limit;
    if(page && limit) {
      fetchPokemons(offset, limit);
    }
  }, [page, limit]);

  useEffect(() => {
    //Debouncing
      const offset = (page - 1) * limit;
      const getDataFiltered = setTimeout(() => {
      fetchPokemons(offset, limit);
    }, 300)
    return () => clearTimeout(getDataFiltered)
  }, [selectedFilter, filterAbilities])

  const detailPokemons = async (response) => {
    response.map((item) => {
      return axios
        .get(item.url)
        .then(response => {
          const {data} = response;
          setAvailableAbilities(prevState => [...new Set([...prevState, ...data.abilities.map(item =>item.ability.name)])]);
          setPokemonList(prevState => {
              const newElement = selectedFilter ? 
                (data.id.toString().includes(selectedFilter) || data.name.includes(selectedFilter) ? 
                [data] : []):[data];
              const elementFilteredByAbilities = data.abilities.some((ability)=>{
                  return filterAbilities.includes( ability.ability.name)
                });
              const newElementFiltered = filterAbilities.length===0 ? newElement: elementFilteredByAbilities ? newElement : [];
            return  [...prevState, ...newElementFiltered ]
          });
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        })
    });
  };


  const handleInputChangeFilter = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handlePageChange = (event) => {
    setPage(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const handlePrevClick = () => {
    setPage((prevPage) => parseFloat(prevPage) - 1);
  };

  const handleNextClick = () => {
    setPage((prevPage) => parseFloat(prevPage) + 1)
  };

  const handleSelectPokemon = (index) => {
    setSelectedPokemon(pokemonList[index]);
  }; 

 return (
   
      <div className="wrapper">
        <section className="wrapper-search">
          <img src="./pokemon-logo.png" alt="poke-logo" height="100px"/>
          <Input onChange={handleInputChangeFilter} placeholder="Please Insert to Filter Id or Name" />
        </section>
        {data.count && <h2>Total number of Pokes {data.count}</h2>}
        <MultipleSelect availableFilters={availableAbilities} onChangeSelectedAbilities={setFilterAbilities}/>
        <Bubles />
        <section className="main-container" >
        <label htmlFor="limitInput">Pokémon per page:</label>
        <select id="limitInput" data-testid="selector-size" value={limit} onChange={handleLimitChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <label htmlFor="pageInput">Page:</label>
        <input type="number" id="pageInput" value={page} onChange={handlePageChange} min={1} max={totalPages} />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            {selectedPokemon && 
              <DetailPoke>
                <section>
                  <h1>Selection:</h1>
                  <h2>{selectedPokemon.name}</h2>
                  <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name}/>
                  <p><span>Id:</span> {selectedPokemon.id}</p>
                  <p><span>Height:</span> {selectedPokemon.height}</p>
                  <p><span>Weight:</span> {selectedPokemon.height}</p>
                  <p><span>Experience:</span> {selectedPokemon.base_experience}</p>
                  <p><span>Type:</span> {selectedPokemon.types[0].type.name}</p>
                  <p><span>Abilities:</span> {selectedPokemon.abilities.map((ability)=> ability.ability.name).join(",")}</p>
                </section>
              </DetailPoke>
            }
            {pokemonList.length === 0 ? 
                <>
                  <p className="warning">Disculpanos pero el Id o Nombre o Filtro por ability, no aparece en la pagina {page} o no existe</p>
                  <p>Consejo: Buscalo en las siguientes paginas, o cambia tu busqueda</p>
                </>
              :
              <List>
                {(pokemonList).map((item, index) => (
                  <PokeSmallCard 
                    item={item} 
                    index={index} 
                    handleSelectPokemon={handleSelectPokemon}/>
                ))}
              </List>
            }
            <Pagination>
              <button onClick={handlePrevClick} disabled={page === 1}>
                Previous
              </button>
              <p>
                Page {page} of {totalPages}
              </p>
              <button onClick={handleNextClick} disabled={page === totalPages}>
                Next
              </button>
            </Pagination>
          </>
        )}
      </section>
    </div>
  );
};
export default App;
