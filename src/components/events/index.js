import React from 'react';
import tinytime from 'tinytime';
import Dropdown from '../dropdown';

export default class Events extends React.Component {
  /**
   * Default state.
   */
  state = {
    city: '',
    date: 0,
    events: []
  };

  /**
   * Fetch events on mount.
   */
  componentDidMount () {
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
  renderCard (event) {
    // Remove images from description.
    const description = event.description ? event.description
      .replace(/<img[^>]*>/g, '')
      .substring(0, 200) + '...' : '';

    return (
      <div className='column is-half' key={event.link}>
        <div className='card'>
          <header className='card-header'>
            <p className='card-header-title'>{event.title}</p>
          </header>
          <div className='card-content'>
            <div className='content'>
              <div dangerouslySetInnerHTML={{__html: description}} />
              <br />
              <time className='tag is-light is-medium' dateTime={tinytime('{YYYY}-{Mo}-{DD}', { padMonth: true }).render(new Date(event.date))}>{tinytime('{YYYY}-{Mo}-{DD} {H}:{mm}:{ss}', { padMonth: true, padHours: true }).render(new Date(event.date))}</time>
            </div>
          </div>
          <footer className='card-footer'>
            <a href={event.link} target='_blank' rel='noopener noreferrer' className='card-footer-item'>Read more</a>
          </footer>
        </div>
      </div>
    );
  }

  /**
   * Render events list.
   */
  render () {
    if (!this.state.events.length) {
      return <p>Loading...</p>;
    }

    const { city, date } = this.state;
    const todaysDate = new Date();

    // Get all events that hasn't passed (api may not up date)
    // and that have a title.
    let events = this.state.events.filter(event => {
      if (event.date < +todaysDate) {
        return false;
      }

      if (!event.title) {
        return false;
      }

      return true;
    });

    // Filter events that should be listed.
    let listEvents = events;

    // Filter by city if any.
    if (city.length) {
      listEvents = listEvents.filter(e => {
        return e.city.toLowerCase() === city.toLowerCase();
      });
    }

    // Filter by date if any.
    if (date) {
      listEvents = listEvents.filter(event => {
        return new Date(date).setHours(0, 0, 0, 0) === new Date(event.date).setHours(0, 0, 0, 0);
      });
    }

    // Get dates to use for filter dropdown.
    const dates = Array.from(new Set(events.map(event => (
      tinytime('{YYYY}-{Mo}-{DD}', { padMonth: true }).render(new Date(event.date))
    )))).map(d => {
      return {
        label: d,
        value: d
      };
    });

      // Get cities to use for filter dropdown.
    const cities = Array.from(new Set(events.map(event =>
      event.city
    ))).map(c => {
      return {
        label: c,
        value: c
      };
    });

    return [
      <strong key='filters'>Filters</strong>,
      <div className='columns' key='columns-1'>
        <div className='column'>
          <Dropdown key='dates' options={dates} placeholder='Select date...' onChange={(value) => {
            this.setState({
              date: Date.parse(value)
            });
          }} />
        </div>
        <div className='column'>
          <Dropdown key='cities' options={cities} placeholder='Select city...' onChange={(value) => {
            this.setState({
              city: value
            });
          }} />
        </div>
        <div className='column'>
          <div className='Select is-clearable is-searchable Select--single'>
            <div className='Select-control'>
              <div className='Select-input'>
                <input type='search' placeholder='Search...' />
              </div>
            </div>
          </div>
        </div>
      </div>,
      <div className='columns is-multiline' key='columns-2'>{listEvents.map(this.renderCard)}</div>
    ];
  }
}
