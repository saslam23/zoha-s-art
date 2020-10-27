import React from 'react';
import Navbar from "./components/Navbar";
import Home from './components/screens/HomeScreen';
import About from "./components/About.component";
import{BrowserRouter as Router, Route} from "react-router-dom";
import ArtWorkScreen from './components/screens/ArtWorkScreen';



function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Route path="/" exact={true} component={Home}/>
      <Route path="/art" component={ArtWorkScreen}/>
      <Route path="/about" component={About}/>
      </Router>

    </div>
  );
}

export default App;
