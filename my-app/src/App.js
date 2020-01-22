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
      imageUrl: '',
     
    }
  }

calculate  

onInputChange = (event) => {
  this.setState({input: event.target.value})
}


onButtonSubmit =() => {
  this.setState({imageUrl: this.state.input});
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
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
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }  
}

export default App;
