import React from 'react';
import tinytime from 'tinytime';
import Dropdown from '../dropdown';

export default class Events extends React.Component {
  /**
   * Default state.
   */
  state = {
    city: '',
    month: 0,
    events: [],
    search: ''
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

              <div className='tags has-addons'>
                <span className='tag is-link is-medium'>
                  <i className='fa fa-calendar' />
                </span>
                <time className='tag is-light is-medium' dateTime={tinytime('{YYYY}-{Mo}-{DD}', { padMonth: true }).render(new Date(event.date))}>
                  {tinytime('{DD} {MMMM} {YYYY}, {H}:{mm}:{ss}', { padMonth: true, padHours: true }).render(new Date(event.date))}
                </time>
                &nbsp;
                <span className='tag is-link is-medium'>
                  <i className='fa fa-building' />
                </span>
                <span className='tag is-light is-medium'>{event.city}</span>
              </div>
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
      return <p>Loading events...</p>;
    }

    const { city, month, search } = this.state;
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

    // Sort by date.
    events = events.sort((a, b) => {
      return a.date - b.date;
    });

    // Clean up city.
    events = events.map(event => {
      event.city = event.city.replace(/\d+(\s|)\d+/, '').trim();
      event.city = event.city.toLowerCase().replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase());

      return event;
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
    if (month) {
      listEvents = listEvents.filter(event => {
        return month === new Date(event.date).getMonth() + 1
      });
    }

    // Filter by search query if any.
    if (search.length) {
      listEvents = listEvents.filter(event => {
        return event.title.toLowerCase().indexOf(search) !== -1 || ('' + event.description).toLowerCase().indexOf(search) !== -1;
      });
    }

    // Sort by date.
    listEvents = listEvents.sort((a, b) => {
      return a.date - b.date;
    });

    // Get months to use for filter dropdown.
    const months = Array.from(new Set(events.map(event => (
      tinytime('{MMMM}-{Mo}').render(new Date(event.date))
    )))).map(d => {
      return {
        label: d.split('-')[0],
        value: d.split('-')[1]
      };
    });

      // Get cities to use for filter dropdown.
    const cities = Array.from(new Set(events.map(event =>
      event.city
    ))).sort((a, b) => a.localeCompare(b)).map(c => {
      return {
        label: c,
        value: c
      };
    });

    return [
      <strong key='filters'>Filters</strong>,
      <div className='columns' key='columns-1'>
        <div className='column'>
          <Dropdown key='months' options={months} placeholder='Select month...' onChange={value => {
            this.setState({
              month: parseInt(value, 10)
            });
          }} />
        </div>
        <div className='column'>
          <Dropdown key='cities' options={cities} placeholder='Select city...' onChange={value => {
            this.setState({
              city: value
            });
          }} />
        </div>
        <div className='column'>
          <div className='Select is-clearable is-searchable Select--single'>
            <div className='Select-control'>
              <div className='Select-input'>
                <input type='search' placeholder='Search...' onChange={event => {
                  this.setState({
                    search: event.target.value
                  });
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>,
      <div className='columns is-multiline' key='columns-2'>{listEvents.map(this.renderCard)}</div>
    ];
  }
}
