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
            <p>Events are fetched from <a href='https://www.meetup.com/'>meetup.com</a> and <a href='https://www.eventbrite.com/'>eventbrite.com</a> that is categorized with tech and from our GitHub. <a href='https://github.com/swedishtechevents/events/issues/new' rel='noopener noreferrer' target='_blank'>Missing your event? Submit it!</a></p>
            <br />
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
