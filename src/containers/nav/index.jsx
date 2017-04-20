import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';

import styles from './styles.css';
import NavDisplay from './navdisplay';

import { selectDate } from '../../actions/actions';


class Nav extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
      selectedDate: props.selectedDate,
      dates: props.dates,
      scrolledindex: 0
    }

    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const node = this.scrolled;
    node.addEventListener('scroll', this.handleScroll);
    node.addEventListener('click', this.handleClick);
  }

  componentWillReceiveProps({ dates, selectedDate }) {
    this.setState({
      selectedDate,
      dates
    })
  }

  handleClick(event) {
    const date = this.state.dates[this.state.scrolledindex];
    console.log(this.state.scrolledindex, `/${date.date}`);
    browserHistory.push(`/${date.date}`);
  }

  handleScroll(event) {
    const prevscrolledindex = this.state.scrolledindex;
    const node = this.scrolled;
    const currscroll = node.scrollTop;
    const maxscroll = node.scrollHeight - node.clientHeight;
    const dateslen = this.state.dates.length;
    const newscrolledindex = Math.min(Math.floor(currscroll / (maxscroll / dateslen)), dateslen - 1);
    this.setState({
      scrolledindex: newscrolledindex
    });
  }

  render () {

    const scrolledindex = this.state.scrolledindex;
    const scrolleddate = this.state.dates.length > 0 ? this.state.dates[this.state.scrolledindex] : { date: '' };
    if (typeof scrolleddate === 'undefined') {
      debugger;
    }
    const dates = this.state.dates;
    const datesHTML = dates.map( (item, index) => (
      <div key={index}>{item.name}</div>
    ));

    return (
      <div className={classNames(styles.header, styles.vert)}>
        { dates.length > 0 && <NavDisplay dates={dates} displaydate={scrolleddate} />}
        <div className={styles.scroller} ref={(comp) => { this.scrolled = comp; }}>
          <div className={styles.days}>
            {datesHTML}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    dates: store.nav.items,
    selectedDate: store.nav.selectedDate
  }
}

export default connect(
  mapStateToProps
)(
  Nav
);
