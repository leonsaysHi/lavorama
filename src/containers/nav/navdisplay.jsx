import React, { PropTypes } from 'react';

import styles from './styles.css';
import LeadingZeroNumber from '../../components/leadingzeronum';

class NavDisplay extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dates: props.dates,
      displaydate: props.displaydate
    }
  }


  componentWillReceiveProps({ displaydate }) {
    const newplaindate = parseInt(displaydate.name.split('_').join(''), 10);
    const prevplaindate = parseInt(this.state.displaydate.name.split('_').join(''), 10);
    const way = newplaindate > prevplaindate ? 1 : -1;
    this.setState({
      displaydate
    })
  }

  render() {

    const { years, months, days } = this.state.dates.reduce( (accu, item) => {
      const [year, month, day] = item.date.split('_');

      // day
      const currday = {
        dates: [item.date],
        str: day
      };
      accu.days.push(currday);

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

      return accu;
    }, { years: [], months: [], days: [] });

    const displayyearindex = years.findIndex( item => item.dates.indexOf(this.state.displaydate.date) > -1 );
    const displaymonthindex = months.findIndex( item => item.dates.indexOf(this.state.displaydate.date) > -1 );
    const displaydayindex = days.findIndex( item => item.dates.indexOf(this.state.displaydate.date) > -1 );
    const displaydateindex = this.state.dates.findIndex( item => item.date === this.state.displaydate.date);

    function getStyleFromDateOffset (offset) {
      const top = offset * 50;
      const opacity = Math.max(0.1, (offset === 0 ? 1 : 0.5) - Math.abs(offset * 0.1));
      // const lineHeight = `${Math.max(10, (50 - Math.abs(offset * 5)))}px`;
      // const fontSize = Math.max(5, 50 - Math.abs(offset * 5));
      return {
        top,
        opacity,
        //l ineHeight,
        // fontSize
      };
    }

    const els = this.state.dates.reduce((accu, item, index) => {

      const [year, month, day] = item.date.split('_');
      const dateoffset = (index - displaydayindex);

      // day
      const lastday = {
        str: day,
        style: getStyleFromDateOffset(dateoffset)
      };
      accu.days.push(lastday);

      // month
      let lastmonth = accu.months[accu.months.length - 1];
      if (!lastmonth || lastmonth.str !== month) {
        lastmonth = {
          str: month,
          style: Object.assign({}, lastday.style)
        };
        accu.months.push(lastmonth);
      }

      // year
      let lastyear = accu.years[accu.years.length - 1];
      if (!lastyear || lastyear.str !== year) {
        lastyear = {
          str: year,
          style: Object.assign({}, lastday.style)
        };
        accu.years.push(lastyear);
      }

      // move down month/year
      if (index <= displaydateindex) {
        lastyear.style = Object.assign({}, lastday.style);
        lastmonth.style = Object.assign({}, lastday.style);
      }

      return accu
    }, {
      years: [],
      months: [],
      days: []
    });

    // build DOM
    const yearsEls = els.years.map( (item, index) => {
      const style = item.style;
      return <div key={`y${index}`} style={style}>{item.str}</div>
    });

    const monthsEls = els.months.map( (item, index) => {
      const style = item.style;
      return <div key={`m${index}`} style={style}>{item.str}</div>
    });

    const daysEls = els.days.map( (item, index) => {
      const style = item.style;
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
