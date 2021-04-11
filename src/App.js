import './App.css';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm.js'
import Particles from 'react-particles-js'

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

function App() {
  return (
    <div className="App">
      <Particles className='particles'
                params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*<FaceRecognition /> */}
    </div>
  );
}

export default App;
