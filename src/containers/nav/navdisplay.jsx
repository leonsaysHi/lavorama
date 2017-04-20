import React, { PropTypes } from 'react';

import styles from './styles.css';
import LeadingZeroNumber from '../../components/leadingzeronum';

class NavDisplay extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dates: props.dates,
      displaydate: props.displaydate,
      way: -1
    }
  }


  componentWillReceiveProps({ displaydate }) {
    const newplaindate = parseInt(displaydate.name.split('_').join(''), 10);
    const prevplaindate = parseInt(this.state.displaydate.name.split('_').join(''), 10);
    const way = newplaindate > prevplaindate ? 1 : -1;
    this.setState({
      displaydate,
      way
    })
  }

  render() {

    const { years, months, days } = this.state.dates.reduce( (accu, item) => {
      const [year, month, day] = item.date.split('_');
      // year
      let curryear = accu.years[accu.years.length - 1];
      if (!curryear || curryear.str !== year) {
        curryear = {
          dates: [],
          str: year
        };
        accu.years.push(curryear);
      }
      curryear.dates.push(item.date);
      // month
      let currmonth = accu.months[accu.months.length - 1];
      if (!currmonth || currmonth.str !== month) {
        currmonth = {
          dates: [],
          str: month
        };
        accu.months.push(currmonth);
      }
      currmonth.dates.push(item.date);
      // day
      let currday = accu.days[accu.days.length - 1];
      if (!currday || currday.str !== day) {
        currday = {
          dates: [],
          str: day
        };
        accu.days.push(currday);
      }
      currday.dates.push(item.date);

      return accu;
    }, { years: [], months: [], days: [] });

    const displayyearindex = years.findIndex( item => item.dates.indexOf(this.state.displaydate.date) > -1 );
    const displaymonthindex = months.findIndex( item => item.dates.indexOf(this.state.displaydate.date) > -1 );
    const displaydayindex = days.findIndex( item => item.dates.indexOf(this.state.displaydate.date) > -1 );

    const yearsEls = years.map( (item, index) => {
      const off = (index - displayyearindex);
      const style = {
        top: Math.min(30, Math.max(-30, off * 30)),
        opacity: off === 0 ? 1 : 0
      }
      return <div key={`y${index}`} style={style}>{item.str}</div>
    });
    const monthsEls = months.map( (item, index) => {
      const off = (index - displaymonthindex);
      const style = {
        top: Math.min(30, Math.max(-30, off * 30)),
        opacity: off === 0 ? 1 : 0
      }
      return <div key={`m${index}`} style={style}>{item.str}</div>
    });
    const daysEls = days.map( (item, index) => {
      const off = (index - displaydayindex);
      const style = {
        top: Math.min(30, Math.max(-30, off * 30)),
        opacity: off === 0 ? 1 : 0
      }
      return <div key={`d${index}`} style={style}>{item.str}</div>
    });

    return (
      <div className={styles.display}>
        <div className={styles.displayyears}>
          {yearsEls}
        </div>
        <div className={styles.displaymonths}>
          {monthsEls}
        </div>
        <div className={styles.displaydays}>
          {daysEls}
        </div>
      </div>
    )
  }
}

export default NavDisplay
