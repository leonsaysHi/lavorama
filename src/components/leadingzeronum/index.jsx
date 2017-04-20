import React from 'react';

const LeadingZeroNumber = (props) => {

  const strnum = parseInt(props.num, 10) < 10 ? `0${props.num}` : props.num;
  return (
    <span>{strnum}</span>
  );
};

export default LeadingZeroNumber;
