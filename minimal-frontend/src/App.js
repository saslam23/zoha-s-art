import React from 'react';
import Navbar from "./components/Navbar";
import Home from './components/screens/HomeScreen';
import About from "./components/About";
import{BrowserRouter as Router, Route} from "react-router-dom";
import ArtWorkScreen from './components/screens/ArtWorkScreen';
import ArtWorkDetailsScreen from './components/screens/ArtWorkDetailsScreen';
import ArtWorkCartScreen from './components/screens/ArtWorkCartScreen';
import SigninScreen from './components/screens/authentication/SigninScreen';
import AdminProductsScreen from './components/screens/AdminProductsScreen';
import SuccessScreen from './components/screens/SuccessScreen';
import PhotographyScreen from './components/screens/PhotographyScreen';



function App() {



  return (
    <div className="App">
      <Router>
      <Navbar />
      <Route path="/" exact={true} component={Home}/>
      <Route exact={true} path="/art" component={ArtWorkScreen}/>
      <Route path="/art/:id" component={ArtWorkDetailsScreen}/>
      <Route path="/about" component={About}/>
      <Route path="/cart/:id?" component={ArtWorkCartScreen}/>
      <Route path="/signin" component={SigninScreen}/>
      <Route path="/admin" component={AdminProductsScreen}/>
      <Route path="/success" component={SuccessScreen}/>
      <Route path="/photography" component={PhotographyScreen}/>
      </Router>

    </div>
  );
}

export default App;
