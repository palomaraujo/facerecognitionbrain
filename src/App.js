import React, { Component } from 'react'
import './App.css';
import Navigation from './components/navigation/Navigation'
import SignIn from './components/SignIn/SignIn'
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
      route: 'signin',
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }

  }

  displayFaceBox = (box) => {
    
    this.setState({ box: box})
  }

  onInputChange = (event) =>{
    this.setState({ input: event.target.value }) 
  }

  onButtonSubmit = () => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
    
  }

  onButtonSignin = () => {
    this.setState({ route: 'home' });
  }

  onButtonSignout = () => {
    this.setState({ route: 'signin' })
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles'
                  params={particlesOptions} />
        <Navigation onButtonSignout = { this.onButtonSignout} />
        { this.state.route === 'signin' ? <SignIn onButtonSignin = {this.onButtonSignin} /> : 
        <>
        <Logo />
        <Rank />
        <ImageLinkForm  onInputChange = {this.onInputChange} onButtonSubmit= {this.onButtonSubmit}/>
        <FaceRecognition box = {this.state.box} imageUrl = { this.state.input }/>
        </>
        }
      </div>
    );
  }
}

export default App;
