import React, { PropTypes } from 'react';
import { Router, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';

import { selectDate } from '../../actions/actions'


class PostsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: props.selectedDate,
      dates: props.dates
    }
  }

  componentWillReceiveProps({ dates, selectedDate }) {
    this.setState({
      selectedDate,
      dates
    })
  }

  render() {
    const items = this.state.dates.slice(-5).map((item, index) => (
      <li key={index}>
        <Link to={`/${item.date}`}>{item.name}</Link>
      </li>
    ));
    return (
      <ul>
        {items}
      </ul>
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
  PostsList
);
