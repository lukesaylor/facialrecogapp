import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import  Clarifai from 'clarifai';

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

const app = new Clarifai.App({
  apiKey: '58b819a3750e4b188bd1fa76a1ab0eac'
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
    }
  }
onInputChange = (event) => {
  console.log(event.target.value)
}


onButtonSubmit =() => {
  console.log('click');
  app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      // do something with response
    },
    function(err) {
      // there was an error
    }
  );
}

  render () {
    return (
      <div className="App">
        <Particles className='particles'
                params={particleoptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition />
      </div>
    );
  }  
}

export default App;
