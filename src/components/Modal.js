import React from 'react';

export default function Modal(props) {
  const onClose = () => {
    props.onCloseModal();
  };

  return (
    <div>
      <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark text-center">Скорректируйте цель</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
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
      </div>
    </div>
  );
}
