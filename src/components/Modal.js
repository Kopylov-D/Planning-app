import React from 'react';
import BackDrop from './BackDrop';

export default function Modal(props) {
  const onClickBackdrop = () => {
    props.onCloseModal();
  };

  return (
    <div>
      <BackDrop onClick={onClickBackdrop} />
      <div className="modal fade show" style={{ display: 'inline-block' }} data-backdrop="">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
