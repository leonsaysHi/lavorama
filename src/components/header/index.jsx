import React from 'react';
import styles from './styles.css';
import PostList from '../../components/postslist';

export default () => (
  <div className={styles.header}>
    <PostList />
  </div>
);
