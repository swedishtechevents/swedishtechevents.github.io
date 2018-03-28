import React from 'react';

export default ({ children }) => (
  <footer className="section">
    <div className="container">
      <div className="content has-text-centered">
        <p>
          Created by{' '}
          <a
            href="https://twitter.com/frozzare"
            rel="noopener noreferrer"
            target="_blank"
          >
            @frozzare
          </a>{' '}
          and{' '}
          <a
            href="https://twitter.com/kolombiken"
            rel="noopener noreferrer"
            target="_blank"
          >
            @kolombiken
          </a>
        </p>
        <p>
          <a
            href="https://github.com/swedishtechevents"
            rel="noopener noreferrer"
            target="_blank"
          >
            Source code
          </a>
          &nbsp;
          -
          &nbsp;
          <a
            href="https://twitter.com/swetechevents"
            rel="noopener noreferrer"
            target="_blank"
          >
            @swetechevents
          </a>
        </p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </div>
  </footer>
);
