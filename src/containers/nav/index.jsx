import React from 'react';
import { Router, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';

import styles from './styles.css';

import { selectDate } from '../../actions/actions';


class Nav extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      selectedDate: props.selectedDate,
      dates: props.dates
    }
    this.toggleNav = this.toggleNav.bind(this);
  }

  componentWillReceiveProps({ dates, selectedDate }) {
    this.setState({
      selectedDate,
      dates
    })
  }

  toggleNav() {
    const newexpanded = this.state.expanded;
    this.setState({
      expanded: !newexpanded
    });
  }

  render () {
    const showhide = this.state.expanded ? styles.show_postList : styles.hide_postList;
    const items = this.state.dates.map((item, index) => (
      <li key={index} className={styles.item}>
        <Link to={`/${item.date}`}>
          <span>{item.name}</span>
        </Link>
      </li>
    ));
    return (
      <div className={styles.header}>
        <button onClick={this.toggleNav}>Hop</button>
        <div className={`${styles.postlist} ${showhide}`}>
          <ul className={styles.list}>
            {items}
          </ul>
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
