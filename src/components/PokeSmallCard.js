import { PokemonImage, PokemonName } from './styledComponents/components';
const PokeSmallCard = ({item, index, handleSelectPokemon}) => {
    return <li key={item.id} className={item.types[0].type.name}>
            <section>
                <span className='id-detail'>Id:{item.id}</span>
                <PokemonImage src={item.sprites.front_default} alt={item.name} />
                <PokemonName onClick={()=> handleSelectPokemon(index)}>{item.name}</PokemonName>
            </section>
        </li>
};
export default PokeSmallCard;