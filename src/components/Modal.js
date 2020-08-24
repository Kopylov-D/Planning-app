import React, { useRef, useEffect } from 'react';

export default function Modal(props) {
  const refInput = useRef(null);

  useEffect(() => {
    refInput.current.focus();
  }, []);

  const onClose = () => {
    props.onCloseModal();
  };

  const onSubmit = (e) => {
    if (e.key === 'Enter' && !props.disabled) {
      props.submitTarget();
    }
  };

  return (
    <div className="myModal" onKeyPress={(e) => onSubmit(e)}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-dark text-center">Cкорректируйте цель</h5>
        </div>
        <div className="modal-body">
          <input
            ref={refInput}
            className="input-group"
            value={props.value}
            onChange={(e) => props.addTarget(e)}
          ></input>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => props.submitTarget()}
            disabled={props.disabled}
          >
            Сохранить
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
