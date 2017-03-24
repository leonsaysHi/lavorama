import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './styles.css';

import Post from '../../components/post';

import { fetchDate } from '../../actions/actions'
import storeConfig from '../../store';

const store = storeConfig();


class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: '',
      imagesByDate: {}
    };
  }

  componentWillReceiveProps({ contents, nav }) {
    this.setState({
      selectedDate: nav.selectedDate,
      imagesByDate: contents
    })
  }

  render() {
    const visus = this.state.imagesByDate[this.state.selectedDate] || [];
    return (
      <div>
        {this.state.selectedDate}
        <hr />
        <Post visus={visus} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    nav: state.nav,
    contents: state.contents
  }
}


export default connect(mapStateToProps)(Posts)
