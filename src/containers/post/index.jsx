import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = { date: props.routeParams.date, selectedSubreddit: props.selectedSubreddit };
  }

  componentWillReceiveProps(nextProps) {

    this.setState({ date: nextProps.routeParams.date })
  }

  render() {
    return (
      <div>
        Post page {this.props.routeParams.date}
      </div>
    )
  }
}


Post.propTypes = {
  selectedSubreddit: PropTypes.string,
  routeParams: PropTypes.shape.isRequired,
}

Post.defaultProps = {
  selectedSubreddit: ''
}

function mapStateToProps(state) {
  return { selectedSubreddit: state.selectedSubreddit }
}


export default connect(mapStateToProps)(Post)
