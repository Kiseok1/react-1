import React, { Component } from 'react';
import { Route } from "react-router-dom";

// css
import '../css/new.css';

// header
import HeaderAdmin from './Header/Header admin';

// footer
import Footer from './Footer/Footer';

// login
import LoginForm from './LoginForm';

import reactThrottle from './R095_reactThrottle';
import floatingPopulationList from './Floating_population/floatingPopulationList';
import boardList from './Board/boardList';
class App extends Component {
  render () {
    return (
      <div className="App">
        <HeaderAdmin/> 
        <Route exact path='/' component={LoginForm} />
        <Route exact path='/Throttle' component={reactThrottle} />
        <Route path='/floatPopulationList' component={floatingPopulationList} />
        <Route path='/boardList' component={boardList}/>
        <Footer/>
      </div>
    );
  }
}

export default App;