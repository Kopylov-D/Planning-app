import React from 'react';

export default function Color(props) {
  return (
    <li
      className={`color-item color ${props.color.name}`}
      onClick={() => props.onClick(props.color)}
    ></li>
  );
}
