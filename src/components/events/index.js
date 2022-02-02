import React from 'react';
import tinytime from 'tinytime';
import Dropdown from '../dropdown';
import Event from '../event';

/**
 * Convert object to query string.
 *
 * @param  {object} obj
 *
 * @return {string}
 */
const toQuery = obj => {
  let query = '?';

  for (let key in obj) {
    query += key + '=' + (obj[key] ? obj[key] : '') + '&';
  }

  return query.slice(0, -1);
};

/**
 * Get uniq events.
 *
 * @param  {array} events
 *
 * @return {array}
 */
const uniqEvents = events => {
  const events2 = {};
  events.forEach(event => {
    if (typeof event === 'object' && !events2[event.link]) {
      events2[event.link] = event;
    }
  });
  return Object.values(events2);
};

export default class Events extends React.Component {
  /**
   * Default state.
   */
  state = {
    city: '',
    month: 0,
    events: [],
    search: '',
  };

  /**
   * Fetch events on mount.
   */
  componentDidMount() {
    const qs = decodeURIComponent(window.location.search.toLowerCase());
    const city = /city=(.*?)(?:&|$)/.exec(qs) || [];
    const month = /month=(\w+)/.exec(qs) || [];
    const search = /search=(.*?)$/.exec(qs) || [];

    this.setState({
      city: city.length > 1 ? city[1] : '',
      month: month.length > 1 ? month[1] : '',
      search: search.length > 1 ? search[1] : '',
    });

    fetch('https://swedishtechevents.github.io/api/events.json')
      .then(res => res.json())
      .then(res => {
        this.setState({
          events: uniqEvents(res),
        });
      });
  }

  /**
   * Render events list.
   */
  render() {
    if (!this.state.events.length) {
      return [
        <h2 key="upcomming-events1" className="title is-3">
          Upcoming events
        </h2>,
        <p key="loading">Loading events...</p>,
      ];
    }

    const { city, month, search } = this.state;
    const todaysDate = new Date();

    // Get all events that hasn't passed (api may not up date)
    // and that have a title.
    let events = this.state.events.filter(event => {
      if (event.time < +todaysDate) {
        return false;
      }

      if (!event.title) {
        return false;
      }

      return true;
    });

    // Sort by date.
    events = events.sort((a, b) => {
      return a.time - b.time;
    });

    // Clean up city.
    events = events.map(event => {
      event.city = event.city.replace(/\d+(\s|)\d+/, '').trim();
      event.city = event.city
        .toLowerCase()
        .replace(/^(.)|\s(.)/g, $1 => $1.toUpperCase());

      return event;
    });

    // Filter events that should be listed.
    let listEvents = events;

    // Filter by month if any.
    if (month && !isNaN(month)) {
      listEvents = listEvents.filter(event => {
        return parseInt(month, 10) === new Date(event.time).getMonth() + 1;
      });
    }

    // Filter by city if any.
    if (city && city.length && city.toLowerCase() !== 'null') {
      listEvents = listEvents.filter(e => {
        return e.city.toLowerCase() === city.toLowerCase();
      });
    }

    // Filter by search query if any.
    if (search.length) {
      listEvents = listEvents.filter(event => {
        return (
          event.title.trim().toLowerCase().indexOf(search) !== -1 ||
          ('' + event.description).trim().toLowerCase().indexOf(search) !== -1
        );
      });
    }

    // Sort by date.
    listEvents = listEvents.sort((a, b) => {
      return a.time - b.time;
    });

    // Get months to use for filter dropdown.
    const months = Array.from(
      new Set(
        events.map(event =>
          tinytime('{MMMM}-{Mo}').render(new Date(event.time)),
        ),
      ),
    ).map(d => {
      return {
        label: d.split('-')[0],
        value: d.split('-')[1],
      };
    });

    // Get cities to use for filter dropdown.
    const cities = Array.from(new Set(events.map(event => event.city)))
      .sort((a, b) => a.localeCompare(b))
      .filter(c => c)
      .map(c => {
        return {
          label: c,
          value: c.toLowerCase(),
        };
      });

    return [
      <h2 key="upcomming-events2" className="title is-3">
        Upcoming events ({listEvents.length})
      </h2>,
      <strong key="filters">Filters</strong>,
      <div className="columns" key="columns-1">
        <div className="column">
          <Dropdown
            label="Month"
            key="months"
            options={months}
            placeholder="Select month..."
            value={month}
            onChange={value => {
              this.setState({
                month: parseInt(value, 10),
              });

              this.props.history.push({
                pathname: '/',
                search: toQuery({
                  month: value,
                  city: city,
                  search: search,
                }),
              });
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="City"
            key="cities"
            options={cities}
            placeholder="Select city..."
            value={city}
            onChange={value => {
              this.setState({
                city: value,
              });

              this.props.history.push({
                pathname: '/',
                search: toQuery({
                  month: month,
                  city: value,
                  search: search,
                }),
              });
            }}
          />
        </div>
        <div className="column">
          <div className="search">
            <label htmlFor="search" className="visually-hidden">
              Search
            </label>
            <div className="search-control">
              <div className="search-input">
                <input
                  id="search"
                  type="search"
                  aria-label="Search"
                  placeholder="Search..."
                  defaultValue={search}
                  onChange={event => {
                    this.setState({
                      search: event.target.value,
                    });

                    this.props.history.push({
                      pathname: '/',
                      search: toQuery({
                        month: month,
                        city: city,
                        search: event.target.value,
                      }),
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>,
      <div className="columns is-multiline" aria-live="polite" key="columns-2">
        {listEvents.map(event => (
          <Event key={event.link} event={event} renderFee={this.renderFee} />
        ))}
      </div>,
    ];
  }
}
