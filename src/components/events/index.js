import React from 'react';
import tinytime from 'tinytime';

export default class Events extends React.Component {
  /**
   * Default state.
   */
  state = {
    events: []
  };

  /**
   * Fetch events on mount.
   */
  componentDidMount() {
    fetch('/api/events.json')
      .then(res => res.json())
      .then(res => {
          this.setState({
            events: res
          });
      });
  }

  /**
   * Render card.
   *
   * @param {object} event
   */
  renderCard(event) {
    if (event.date < Date.now()) {
      return;
    }

    if (!event.description) {
      return;
    }

    const description = event.description
      .replace(/<img[^>]*>/g, '')
      .substring(0, 200) + '...';

    return (
      <div className="column is-half">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{event.title}</p>
          </header>
          <div className="card-content">
            <div className="content">
              <div dangerouslySetInnerHTML={{__html: description}}></div>
              <br/>
              <time className="tag is-light is-medium" datetime={tinytime('{YYYY}-{Mo}-{DD}', { padMonth: true }).render(new Date(event.date))}>{tinytime('{YYYY}-{Mo}-{DD} {H}:{mm}:{ss}', { padMonth: true, padHours: true }).render(new Date(event.date))}</time>
            </div>
          </div>
          <footer className="card-footer">
            <a href={event.link} target="_blank" rel="noopener noreferrer" className="card-footer-item">Read more</a>
          </footer>
        </div>
      </div>
    );
  }

  /**
   * Render events list.
   */
  render() {
      if (!this.state.events.length) {
        return <p>Loading...</p>;
      }

      return (
        <div className="columns is-multiline">{this.state.events.map(this.renderCard)}</div>
      );
  }
}
