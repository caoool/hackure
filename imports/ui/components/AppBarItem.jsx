import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const AppBarItem = ({  Icon, show, link, tooltip, action }) => {
  return show ?
    link ? (
      <Link to={link} className="tooltip -bottom" data-tooltip={tooltip}>
        <Icon color="white" />
      </Link>
    ) : (
      <a className="tooltip -bottom" data-tooltip={tooltip} onClick={action}>
        <Icon color="white" />
      </a>
    ) : null;
}

export default AppBarItem;