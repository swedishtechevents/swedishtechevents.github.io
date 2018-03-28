import React from 'react';
import Header from './components/Header';
import Events from './components/Events';
import Footer from './components/Footer';

export default props => (
  <div>
    <Header
      title="Swedish Tech Events"
      subtitle="Events for developers, technologists, and other geeks in Sweden"
    />
    <main className="section">
      <div className="container">
        <p>
          Events are fetched from{' '}
          <a href="https://www.meetup.com/">meetup.com</a> and{' '}
          <a href="https://www.eventbrite.com/">eventbrite.com</a> that is
          categorized with tech and from our GitHub.{' '}
          <a
            href="https://github.com/swedishtechevents/events/issues/new"
            rel="noopener noreferrer"
            target="_blank"
          >
            Missing your event? Submit it!
          </a>
        </p>
        <br />
        <Events history={this.props.history} />
      </div>
    </main>
    <Footer />
  </div>
);
