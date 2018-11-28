import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './App.css';
import Map from './component/Map.js'
import UserSection from './component/UserSection.js'
import LocationDetails from './component/LocationDetails.js'
import * as Utils from './UtilsAPI.js'
import * as Data from './Data/Json.js'

class App extends Component {

  state = {
    query: '',
    filterResult:[], // contain filtered location based on user input
    isOpen: '', // indicate wither UserSection is open or not
    viewport: {
      latitude: 24.46,
      longitude: 54.46,
      zoom: 9,
      bearing: 0,
      pitch: 0
    }, // contain map style
    name: '',
    description: '',
    image: '',
    iconClass:'animated rubberBand delay-3s'
  }

// this method get the text from the search field
  getQuery = (e) => {
    var value = e.target.value.toLowerCase();
    this.setState({query: value},this.filter)
  }

// this method filter the location thats matches user input and return all matches location
  filter = () => {
    this.setState({filterResult: Data.features.filter(position => {
      var name = position.place_name.toLowerCase();
      return name.indexOf(this.state.query) > -1;
    })})
  }

// this method calls when the user hit the humberger menu icon to open or close the search section
  toggleSearch = () => {
   var userSection = document.querySelector('#user-section');
   var navHeader =   document.querySelector(".topnav");
    if (userSection.style.display === 'block') {
        userSection.style.display = 'none'
        navHeader.style.width = "100%";
        this.setState({isOpen: false})
    }
   else {
        userSection.style.display = 'block'
        navHeader.style.width = "70%";
        this.setState({isOpen: true})
    }

    this.setState({filterResult:Data.features})
    this.setState({iconClass:''})
  }

// helper method to return current window width
  getCurWidth = (e) => {
    this.setState({isOpen: e.target.innerWidth <= 600 ? false: true})
  }

// this method calls when user click on the marker or location name in the list
  getSelectedLocation = (coordinates,locationName) => {

    /* update viewport and set center of the map into selected location coordinates */
    this.setState({viewport : {
      latitude: coordinates[1],
      longitude: coordinates[0] + 0.009,
      zoom: 13,
      bearing: 0,
      pitch: 0}});
      this.setState({isOpen: false});

      /* display location detalis model */
      document.querySelector('#place-details-container').style.display = 'block';

      /* fetch details for current location */
      this.getSelectedLocationInfo(locationName.trim());

  }

// this method calls by <Map/> Component to update map style
  _updateViewport = (viewport) => {
      this.setState({viewport});
      this.setState({filterResult:Data.features})
      this.setState({iconClass:''})
  }

// calls when user hit the close icon on the location detalis model
  removeDetails = () => {
    document.querySelector('#place-details-container').style.display = 'none';
    this.setState({filterResult:Data.features})
    this.setState({iconClass:''})
  }

// this method fetch location deatils {name,description,image} from third-party  API
  getSelectedLocationInfo = (locationName) => {

    /* get location name and description from wikipedia API */
    Utils.getWikipediaIntroduction(locationName).then(location => {
        this.setState({name: location != null ? location.title : locationName})
        this.setState({description: location != null ? location.extract : "No info found check your internet"})
    })

    /* get location image from flicke API*/
    Utils.getFlickrPhoto(locationName).then(img =>
      this.setState({image: img != null ? img : '/default/thumbnail.jpg'})
    )

   this.animateSelectedLocation(locationName)
  }

// this method clear any marker except the selected one
animateSelectedLocation = (curName) => {
  this.setState({filterResult: Data.features.filter(position => {
    var name = position.place_name.toLowerCase();
    return name === curName.toLowerCase()
  })})

  this.setState({iconClass:'animated bounceInDown delay-0.5s'})
}


  componentDidMount() {
    /* set the default location */
    this.setState({filterResult:Data.features})

    /* return current width as soon as the app start */
    this.setState({isOpen: window.innerWidth <= 600 ? false: true})
  }

  render() {
    window.addEventListener('resize', this.getCurWidth)

    return (
      <div>
        <header className="topnav" style={{width:this.state.isOpen ? '70%' : '100%'}}>
          <Link to='/' className="icon" onClick={this.toggleSearch}>
            <i className="fa fa-bars"></i>
          </Link>
        </header>

        {/* Render MAP Component*/}
        <Map
          isOpen = {this.state.isOpen}
          positions = {this.state.filterResult}
          viewport = {this.state.viewport}
          _updateViewport = {this._updateViewport}
          getSelectedLocation = {this.getSelectedLocation}
          iconClass={this.state.iconClass}
        />

        {/* Render Search & Location List Components*/}
        <UserSection
          positions = {this.state.filterResult}
          query = {this.state.query}
          getQuery = {this.getQuery}
          isOpen = {this.state.isOpen}
          getSelectedLocation = {this.getSelectedLocation}
        />

        {/* Render Location Details Model Components*/}
        <LocationDetails
          name={this.state.name}
          description={this.state.description}
          image={this.state.image}
          remove={this.removeDetails}
        />
      </div>
    )
  }
}

export default App;
