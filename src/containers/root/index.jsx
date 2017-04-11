import React, { PropTypes } from 'react';
import Home from '../../components/home';
import Nav from '../../containers/nav';
import styles from './styles.css';

const Root = ({ children }) => {
  return (
    <div className={styles.root}>

      <div className={styles.content}>
        { children || <Home /> }
      </div>

      <div className={styles.nav}>
        <Nav />
      </div>

    </div>
  )
};

Root.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Root;
