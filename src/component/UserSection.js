import React, {Component} from 'react';
import LocationList from './LocationList.js'

export default class UserSection extends Component {

  render() {
    return (
      <div id='user-section' style={{display:this.props.isOpen ?'block':'none'}}>

        <h3>Neighbourhood Map</h3>

        <div id='search-container'>
          <input
            className='filter-input'
            type='text'
            name='filter'
            placeholder='Filter by name'
            value={this.props.query}
            onChange={this.props.getQuery}
          />

          <button
            type="button"
            className="filter-btn"
          >
            <i className="fa fa-filter"></i>
          </button>
        </div>

        < LocationList
          positions={this.props.positions}
          getSelectedLocation={this.props.getSelectedLocation}
        />

      </div>
    );
  }
}
