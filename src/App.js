import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Input} from '@mui/material';
import Bubles from './components/Bubles';
import MultipleSelect from './components/MultipleSelect';


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

  useEffect(() => {
    setLoading(true);
    fetchPokes();
  }, [page, limit]);

  useEffect(() => {
    //Debouncing 
    const getDataFiltered = setTimeout(() => {
      fetchPokes();
    }, 300)
    return () => clearTimeout(getDataFiltered)
  }, [selectedFilter, filterAbilities])

  const detailPokemons = (response) => {
    response.map((item)=>{
      fetch(item.url)
      .then((response) => response.json())
      .then((data) =>  {
        /// updating all elements with all the properties and also i added the filter by name or id
        setAvailableAbilities(prevState => [...new Set([...prevState, ...data.abilities.map(item =>item.ability.name)])]);
        setPokemonList(prevState => {

            const newElement = selectedFilter ? 
              (data.id.toString().includes(selectedFilter) || data.name.includes(selectedFilter) ? 
              [data] : []):[data];
            const elementFilteredByAbilities = data.abilities.some((ability)=>{
                return filterAbilities.includes( ability.ability.name)
              });
            const newElementFiltered = filterAbilities.length===0 ? newElement: elementFilteredByAbilities ? newElement : [];
            console.log(data.name,elementFilteredByAbilities, newElementFiltered);
          return  [...prevState, ...newElementFiltered ]
        });
        setLoading(false);
      })
    });   
  };
  console.log(availableAbilities);

  const fetchPokes = () => {
    const offset = (page - 1) * limit;
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) =>  {
          setTotalPages(Math.ceil(data.count / limit));
          setPokemonList([]);
          console.log(data.results);
          detailPokemons(data.results);
          setLoading(false);
        }
      )
      .catch((error) => {
        setError(error);
        setLoading(false);
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

console.log(pokemonList);
 return (
   
      <div className="wrapper">
        <section className="wrapper-search">
          <img src="./pokemon-logo.png" alt="poke-logo" height="100px"/>
          <Input onChange={handleInputChangeFilter} placeholder="Please Insert to Filter Id or Name" />
        </section>
        <MultipleSelect availableFilters={availableAbilities} onChangeSelectedAbilities={setFilterAbilities}/>
        <Bubles />
        <section className="main-container" >
        <label htmlFor="limitInput">Pokémon per page:</label>
        <select id="limitInput" value={limit} onChange={handleLimitChange}>
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
                  <li key={item.id} className={item.types[0].type.name}>
                    <section>
                      <span className='id-detail'>Id:{item.id}</span>
                      <PokemonImage src={item.sprites.front_default} alt={item.name} />
                      <PokemonName onClick={()=> handleSelectPokemon(index)}>{item.name}</PokemonName>
                    </section>
                  </li>
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

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 1rem;
  li {
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: center;
    max-height: 150px;
    width: 100px;
    font-weight: bold;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
  .rock {
    background-image: linear-gradient(
      to top, #c79081 0%, #dfa579 100%);
    button {
      background-color: #dfa579;
      border-color: gray;
    };
  }
    
  .ghost {
    background-image: linear-gradient(
      to top, #cfd9df 0%, #e2ebf0 100%);
    button {
      background-color: #e2ebf0;
      border-color: gray;
    };
  }
    
  .electric {
    background-image: linear-gradient(
      to right, #f83600 0%, #f9d423 100%);
    button {
      background-color: #f9d423;
      border-color: gray;
    };
  }
    
  .bug {
    background-image: linear-gradient(
      to top, #e6b980 0%, #eacda3 100%);
    button {
      background-color: #eacda3;
      border-color: gray;
    };
  }
    
  .poison {
    background-image: linear-gradient(
      to top, #df89b5 0%, #bfd9fe 100%);
    button {
      background-color: #bfd9fe;
      border-color: gray;
    }
  }
    
  .normal {
    background-image: linear-gradient(
      -225deg, #e3fdf5 0%, #ffe6fa 100%);
    button {
      background-color: #ffe6fa;
      border-color: gray;
    }
  }
    
  .fairy {
    background-image: linear-gradient(
      to top,
      #ff9a9e 0%,
      #fecfef 99%,
      #fecfef 100%
    );
    button {
      background-color: #fecfef;
      border-color: gray;
    }
  }
    
  .fire {
    background-image: linear-gradient(
      120deg, #f6d365 0%, #fda085 100%);
    button {
      background-color: #fda085;
      border-color: gray;
    }
  }
    
  .grass {
    background-image: linear-gradient(
      120deg, #d4fc79 0%, #96e6a1 100%);
    button {
      background-color: #96e6a1;
      border-color: gray;
    }
  }
    
  .water {
    background-image: linear-gradient(
      120deg, #89f7fe 0%, #66a6ff 100%);
    button {
      background-color: #66a6ff;
      border-color: gray;
    }
  }
    
  .ground {
    background-image: linear-gradient(
      315deg, #772f1a 0%, #f2a65a 74%);
    button {
      background-color: #f2a65a;
      border-color: gray;
    }
  }
`;

const PokemonImage = styled.img`
  width: 90px;
  height: 90px;
`;

const PokemonName = styled.button`
  text-transform: capitalize;
  margin: 5px;
  text-align: center;
  padding: 4px;
`;

const Pagination = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  color: white;
  button {
    margin: 0 0.5rem;
    min-width: 70px;
  }
`;

const DetailPoke = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  color: white;
  section {
    background-color: rgb(0 0 0 / 31%);
    border-color: #f9d423;
    border-style: solid;
    border-width: 9px;
    color: #f8f8f8;
    padding: 4px;
    border-radius: 16px;
  }
`;

