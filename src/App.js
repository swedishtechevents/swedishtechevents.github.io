import React, { Component } from 'react';
import Header from './components/header';
import Events from './components/events';

class App extends Component {
  render() {
    return (
      <div>
        <Header title="Swedish Tech Events" subtitle="Events for developers, technologists, and other geeks in Sweden" />
        <main className="section">
          <div className="container">
            <p className="has-text-centered"><a href="https://github.com/swedishtechevents/events/issues/new" rel="noopener noreferrer" target="_blank">Missing your event? Submit it!</a></p>
            <br/>
            <h3 className="title is-3">Upcoming events</h3>
            <Events />
          </div>
        </main>
        <footer class="section">
          <div class="container">
            <div class="content has-text-centered">
              <p>Created by <a href="https://twitter.com/frozzare" rel="noopener noreferrer" target="_blank">@frozzare</a> and <a href="https://twitter.com/kolombiken" rel="noopener noreferrer" target="_blank">@kolombiken</a></p>
              <p><a href="https://github.com/swedishtechevents" rel="noopener noreferrer" target="_blank">Source code</a></p>
              <p>© {new Date().getFullYear()}</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
