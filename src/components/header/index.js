import React from 'react';

export default ({ title, subtitle }) => (
  <header className="header section">
    <div className="has-text-centered">
      <h1 className="title">{title}</h1>
      <h2 className="subtitle">{subtitle}</h2>
    </div>
  </header>
);
