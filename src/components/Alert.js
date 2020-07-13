import React, { Fragment } from 'react';

export default function Alert({ alert, closeAlert}) {
  const style = {
    left: alert.positionLeft,
    top: alert.positionTop,
  };

  return (
    <Fragment>
      {alert.show && (
        <div
          className={`alert alert-${alert.type || 'warning'} align-middle`}
          style={style}
        >
          <div>{alert.text}</div>
          <span onClick={() => closeAlert()}>&times;</span>
        </div>
      )}
    </Fragment>
  );
}
