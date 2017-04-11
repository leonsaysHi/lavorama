import React, { PropTypes } from 'react';

import styles from './styles.css';

import MonthGroup from './monthgroup';

const YearGroup = (props) => {

  const months = props.items.reduce( (accu, item) => {
    const [year, month, day] = item.date.split('_');
    let group = accu.find( _group => _group.month === month );
    if (!group) {
      group = { year: props.year, month, items: [] };
      accu.push(group);
    }
    group.items.push(item);
    return accu;
  }, []);

  const monthsHTML = months.map( (item, index) => (
    <MonthGroup year={item.year} month={item.month} items={item.items} key={index} />
  ));

  return (
    <div>
      <h1>{props.year}</h1>
      <div className={styles.months}>{monthsHTML}</div>
    </div>
  )
}

export default YearGroup
