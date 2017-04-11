import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import styles from './styles.css';
import YearGroup from './yeargroup';

import { selectDate } from '../../actions/actions';


class Nav extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
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

    const years = this.state.dates.reduce((accu, item) => {
      const [year, month, day] = item.date.split('_');
      let group = accu.find( _group => _group.year === year );
      if (!group) {
        group = { year, items: [] };
        accu.push(group);
      }
      group.items.push(item);
      return accu;
    }, []);

    const yearsHTML = years.map( (item, index) => (
      <YearGroup year={item.year} items={item.items} key={index} />
    ));

    return (
      <div className={classNames(styles.header, styles.vert)}>
        <div className={styles.nav_wrapper}>
          <div className={styles.years}>
            {yearsHTML}
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
