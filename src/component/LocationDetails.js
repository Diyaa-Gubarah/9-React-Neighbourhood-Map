import React, {Component} from 'react';
import { Link } from 'react-router-dom'

export default class LocationDetails extends Component {

  render() {
    return (
      <div id='place-details-container' style={{display: 'none'}} tabIndex='0' aria-label='model show more information about selected location'>
        <Link to='/'><i className="far fa-times-circle" onClick={() => this.props.remove()}></i></Link>

        <img id='place-img' src={`${this.props.image}`} alt={`${this.props.name}`}
        tabIndex='0'></img>

        <div id='place-title'>
          <h2
          aria-label='location name is' tabIndex='0'>{this.props.name}</h2>
          <h3
          tabIndex='0'
          aria-label='location city'>Abu Dhabi</h3>
          <h4
          tabIndex='0'
          aria-label='location country'>United Arab Emirates</h4>
        </div>

        <p id='place-description'>{this.props.description}</p>

      </div>
    );
  }
}
