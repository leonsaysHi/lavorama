import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visus: props.visus
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      visus: props.visus
    })
  }

  render() {
    const visus = this.state.visus.slice(-5).map((visu, index) => (
      <li key={index}>
        {visu.src}
      </li>
    ));
    return (
      <ul>
        {visus}
      </ul>
    )
  }
}


export default Post
