import React, {Component} from 'react';
import './Card.css';

class Card extends Component {
    render() {
        return (
            <div className="pokecard">
                <h4>#{this.props.id}</h4>
                <h1>{this.props.name}</h1>
                <div className="image">
                    <img src={this.props.image} alt={this.props.id} />
                </div>
                <h4>Base_experience: {this.props.base_experience}</h4>
                <h4>Type: {this.props.type}</h4>
            </div>
        )
    }
}

export default Card;