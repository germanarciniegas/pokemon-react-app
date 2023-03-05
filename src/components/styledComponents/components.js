import styled from 'styled-components';
export {DetailPoke, List, Pagination, PokemonImage, PokemonName};

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

