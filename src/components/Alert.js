import React from 'react';
import { CSSTransition } from 'react-transition-group';

export default function Alert({ alert, closeAlert }) {
  const style = {
    left: alert.positionLeft,
    top: alert.positionTop,
  }

  return (
    <CSSTransition
      in={alert.show}
      timeout={{ enter: 350, exit: 500 }}
      classNames={'alert'}
      mountOnEnter
      unmountOnExit
    >
      <div
        className={`alert alert-${alert.type || 'warning'} align-middle`}
        style={style}
      >
        <div>{alert.text || 'warning'}</div>
        <span onClick={() => closeAlert()}>&times;</span>
      </div>
    </CSSTransition>
  );
}
