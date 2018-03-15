import React, { Component } from 'react';
import Header from './components/header';
import Events from './components/events';
import Footer from './components/footer';

class App extends Component {
  render () {
    return (
      <div>
        <Header title='Swedish Tech Events' subtitle='Events for developers, technologists, and other geeks in Sweden' />
        <main className='section'>
          <div className='container'>
            <h2 className='title is-3'>About</h2>
            <p>Lorem ipsum dolor sit amet, cu vel legere civibus delicata, ex dolores perfecto tincidunt usu. Pro ut natum iracundia, graeco utroque detraxit ad eos, mel id vocent diceret. Sonet saperet assueverit pro at, at ridens facilisis posidonium cum. Mei ex nostrum periculis. Eum prodesset vituperatoribus in, consulatu temporibus cu vis. <a href='https://github.com/swedishtechevents/events/issues/new' rel='noopener noreferrer' target='_blank'>Missing your event? Submit it!</a></p>
            <br />
            <h2 className='title is-3'>Upcoming events</h2>
            <Events />
          </div>
        </main>
        <Footer>
          <p>Created by <a href='https://twitter.com/frozzare' rel='noopener noreferrer' target='_blank'>@frozzare</a> and <a href='https://twitter.com/kolombiken' rel='noopener noreferrer' target='_blank'>@kolombiken</a></p>
          <p><a href='https://github.com/swedishtechevents' rel='noopener noreferrer' target='_blank'>Source code</a></p>
          <p>© {new Date().getFullYear()}</p>
        </Footer>
      </div>
    );
  }
}

export default App;
