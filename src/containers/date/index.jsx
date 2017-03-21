import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

class DatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedDate: props.selectedDate };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedDate: nextProps.selectedDate })
  }

  render() {
    return (
      <div>
        Post page {this.props.selectedDate}
      </div>
    )
  }
}


DatePage.propTypes = {
  selectedDate: PropTypes.string,
  routeParams: PropTypes.shape.isRequired,
}

DatePage.defaultProps = {
  selectedDate: ''
}

function mapStateToProps(state) {
  return { selectedDate: state.selectedDate }
}


export default connect(mapStateToProps)(DatePage)
