import React, { Component } from 'react'
import './App.css';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm.js'
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey:'a420a2c791ad4fa98dda5207a96f8d79'
})

const particlesOptions = {
  particles: {
      number: {
        value:60,
        density: {
          enable: true,
          value_area:800
        }
      }
  }
}

class  App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {

  }
  onInputChange = (event) =>{
    this.setState({ input: event.target.value }) 
  }

  onButtonSubmit = () => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function (response){
        this.calculateFaceLocation(response);
      },
      function(err){
        //erro
      }
    );
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles'
                  params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm  onInputChange = {this.onInputChange} onButtonSubmit= {this.onButtonSubmit}/>
        <FaceRecognition imageUrl = { this.state.input }/>
      </div>
    );
  }
}

export default App;
