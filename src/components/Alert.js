import React, { Fragment, useEffect } from 'react';

export default function Alert({ alert }) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('This will run after 1 second!');
    }, 1000);
    return () => clearTimeout(timer);
  }, [alert.show]);

  return (
    <Fragment>
      {alert.show && (
        <div className="alert alert-warning align-middle">{alert.text}</div>
      )}
    </Fragment>
  );
}
