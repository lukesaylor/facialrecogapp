import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import  Clarifai from 'clarifai';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

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
      box: {},
      route: 'SignIn',
      isSignedIn: false
    }
  }

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height),
  }
}

displayFaceBox = (box) => {
  this.setState({box: box});
}

onInputChange = (event) => {
  this.setState({input: event.target.value})
}


onButtonSubmit =() => {
  this.setState({imageUrl: this.state.input});
  app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
     this.state.input)
     .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
     .catch(err => console.log(err))
    };

onRouteChange = (route) => {
  if (route === 'SignOut') {
    this.setState({isSignedIn:false})
  }else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}   
    

  render () {
    const { isSignedIn, imageUrl, route, box} =this.state;
    return (
      <div className="App">
        <Particles className='particles'
                params={particleoptions} />
        <Navigation  isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
            route === 'SignIn'
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }  
}

export default App;
