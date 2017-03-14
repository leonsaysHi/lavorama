import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';


const list = (datas) => {
  const items = datas.posts.reactjs.items.slice(-5).map((item, index) => (
    <li key={index}>
      <IndexLink to={`/${item.date}`}>
        {item.name}
      </IndexLink>
    </li>
  ));
  return (
    <ul>
      {items}
    </ul>
  );
};

const mapStateToProps = (store) => {
  return {
    posts: store.postsBySubreddit
  }
}

export default connect(
  mapStateToProps
)(
  list
);
