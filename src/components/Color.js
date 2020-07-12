import React from 'react';

export default function Color({color, onClick}) {
  return (
    <li
      className={`color-item color ${color.name}`}
      onClick={() => onClick(color)}
    ></li>
  );
}
