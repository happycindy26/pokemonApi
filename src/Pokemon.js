import React, {Component} from 'react';
import axios from 'axios';
import Card from './Card.js';
import './Pokemon.css';

//const API_URL = "https://pokeapi.co/api/v2/pokemon";
const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=100";

class Pokemon extends Component {
    static defaultProps = { numPokemonUrl: 4 };
    constructor(props) {
        super(props);
        this.state = { deck: [], shown: []};
        this.getCards = this.getCards.bind(this);
      
    }
    
    async componentDidMount() {
        const deckRes = await axios.get(API_URL);
        const pokemonAll = deckRes.data.results;
        const pokemonUrl = pokemonAll.map(pokemon => pokemon.url);
        this.setState({deck: pokemonUrl})
        //console.log(this.state.deck)
        //this.seenPokemon = new Set(this.state.shown.map(c => c.id));
    }

    async getCards() {
        let pokemon = [];
        while (pokemon.length < this.props.numPokemonUrl) {
            const randomPokemonUrl = this.state.deck[Math.floor( Math.random() * this.state.deck.length )];
            const CardRes = await axios.get( randomPokemonUrl );
            //if (this.seenPokemon.has(CardRes.data))
            pokemon.push(CardRes.data);
            
        }
        //console.log(pokemon);
        pokemon.map(card => {
            //const imgAPI = "https://pokeres.bastionbot.org/images/pokemon/";
            const pokemonTypes = card.types.map(type => type.type.name).join(' & ');
            this.setState( st => ({
                shown: [
                    ...st.shown, {
                        id: card.id,
                        name: card.name,
                        image: card.sprites.back_default,
                        // image: `${imgAPI}/${card.id}.png`,
                        base_experience: card.base_experience,
                        type: pokemonTypes
                    }
                ]
            }))
        })
    }
    render() {
        const cards = this.state.shown.map(card => (
            <Card key={card.id}
                id={card.id}
                name={card.name}
                image={card.image}
                base_experience={card.base_experience}
                type={card.type} />
        ))
        return (
            <div>
                <h1 className="title">Pokemon Cards</h1>
                <button className="button" onClick={this.getCards}>Get Cards</button>
                <div className="pokecard-container">
                    {cards}
                </div>
            </div>
        )
    }
}

export default Pokemon;
