import React, { useState } from 'react';
import Modal from '../components/Modal';

const Header = () => {
  const [target, setTarget] = useState([
    { id: 1, target: 'Выучить react' },
    { id: 2, target: 'Выучить js' },
    { id: 3, target: 'Сделать что то' },
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onCloseModalHandler = () => {};

  function changeTarget() {
    console.log('target');
  }
  return (
    <div className="header rounded">
      <h1 className="m-1 pt-0 text-center">Цели</h1>
      <ul className="targets">
        {target.map((t) => {
          return (
            <li key={t.id} onClick={changeTarget}>
              {t.target} &times;
            </li>
          );
        })}
      </ul>
      {modalIsOpen && <Modal onCloseModal={onCloseModalHandler} />}
    </div>
  );
};

export default Header;
