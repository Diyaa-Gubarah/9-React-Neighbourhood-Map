import React, {Component} from 'react';

export default class LocationList extends Component {

  render() {
    const list = this.props.positions && this.props.positions.map((position,i) =>
                    <p key={i} onClick={() => this.props.getSelectedLocation(position.geometry.coordinates,position.place_name)}
                    aria-label={`${position.place_name}`}
                    tabIndex='0'
                    >
                        {position.place_name}
                    </p>
                 )

    return (
      <div id='list-container'>
        <div className="location-list" tabIndex='0' aria-label='list for current location in the map'>
          {list}
        </div>
      </div>
    );
  }
}
