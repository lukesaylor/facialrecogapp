import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';

const particleoptions = {
  particles: {
    number: {
      value:100,
      density: {
        enable: true,
        value_area: 800,
        blur: 5
      }
    }
  }
}





class App extends Component {
  render () {
    return (
      <div className="App">
        <Particles className='particles'
                params={particleoptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
      </div>
    );
  }  
}

export default App;
