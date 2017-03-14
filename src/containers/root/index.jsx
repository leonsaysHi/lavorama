import React, { PropTypes } from 'react';
import Home from '../../containers/home';
import Header from '../../components/header';
import styles from './styles.css';

const Root = ({ children }) => {
  return (
    <div className={styles.root}>

      <Header />

      <div className={styles.content}>
        { children || <Home /> }
      </div>

    </div>
  )
};

Root.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Root;
