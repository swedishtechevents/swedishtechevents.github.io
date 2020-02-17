import React from 'react';
import tinytime from 'tinytime';

export default ({ event }) => (
  <div className="column is-half" key={event.link}>
    <a
      href={event.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card"
    >
      <div className="card-header">
        <h3 className="card-header-title break-all">{event.title}</h3>
      </div>
      <div className="card-content">
        <div className="content">
          <div className="tags has-addons">
            <span className="tag is-link is-medium">
              <span className="fa fa-calendar" aria-hidden="true" />
            </span>
            <time
              className="tag is-light is-medium"
              dateTime={event.date.split(' ').shift()}
            >
              {tinytime('{DD} {MMMM} {YYYY}, {H}:{mm}', {
                padMonth: true,
                padHours: true,
              }).render(new Date(Date.parse(event.date)))}
            </time>
            &nbsp;
            <span className="tag is-link is-medium">
              <span className="fa fa-building" />
            </span>
            <span className="tag is-light is-medium">{event.city}</span>
            {!event.free && (
              <div>
                &nbsp;
                <span className="tag is-link is-medium">
                  <i className="fa fa-dollar" />
                </span>
                <span className="tag is-light is-medium">Fee</span>
              </div>
            )}
          </div>
          <div className="break-all">{event.description || ''}</div>
        </div>
      </div>
    </a>
  </div>
);
