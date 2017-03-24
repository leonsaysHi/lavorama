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
    const visus = this.state.visus.map((visu, index) => (
      <div className={styles.diapo}>
        <img src={visu.src}  alt="" className={styles.img} />
      </div>
    ));
    return (
      <div className={styles.diapos}>
        {visus}
      </div>
    )
  }
}


export default Post
