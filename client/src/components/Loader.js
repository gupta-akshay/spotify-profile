import React from 'react';

import '../styles/loader.scss';

const Loader = () => (
  <div className="loader">
    <div className="loader__bars">
      <div className="loader__bars-bar" style={{ animationDelay: '250ms' }} />
      <div className="loader__bars-bar" style={{ animationDelay: '715ms' }} />
      <div className="loader__bars-bar" style={{ animationDelay: '475ms' }} />
      <div className="loader__bars-bar" style={{ animationDelay: '25ms' }} />
      <div className="loader__bars-bar" style={{ animationDelay: '190ms' }} />
    </div>
  </div>
);

export default Loader;
