import React from 'react';
import styles from './styles.css';
import PostsList from '../../components/postslist';

export default () => (
  <div className={styles.header}>
    <PostsList />
  </div>
);
