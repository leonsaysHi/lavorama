import React, { PropTypes } from 'react';
import { Router, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';

import storeConfig from '../../store';
import { selectDate } from '../../actions/actions'

const store = storeConfig();

class PostsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: props.selectedDate,
      dates: props.dates
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedDate: nextProps.selectedDate,
      dates: nextProps.dates
    })
  }

  clickDate(date) {
    console.log(date, this.state)
    browserHistory.push(`/${date}`)
    store.dispatch(selectDate(date))
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

const mapStateToProps = (storeDatas) => {
  return {
    dates: storeDatas.posts.items,
    selectedDate: storeDatas.selectedDate
  }
}

export default connect(
  mapStateToProps
)(
  PostsList
);
