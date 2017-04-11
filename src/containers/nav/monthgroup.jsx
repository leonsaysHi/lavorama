import React, { PropTypes } from 'react';
import { Router, browserHistory, Link } from 'react-router';

import styles from './styles.css';

const MonthGroup = (props) => {
  const items = props.items.map( (item, index) => (
    <Link to={`/${item.date}`} key={index}>
      <span>{item.name.split('/')[0]}</span>
    </Link>
  ));
  return (
    <div>
      <h2>{props.month}</h2>
      <div className={styles.days}>{items}</div>
    </div>
  )
}

export default MonthGroup
