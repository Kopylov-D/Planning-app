import React, { useState, Fragment } from 'react';

import Modal from '../components/Modal';
import Alert from '../components/Alert';

import gear from '../images/gear.svg';
import { CSSTransition } from 'react-transition-group';

const Header = () => {
  const [target, setTarget] = useState([
    { id: 0, value: 'Новая цель 1' },
    { id: 1, value: 'Новая цель 2' },
    { id: 2, value: 'Новая цель 3' },
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentValue, setCurrentValue] = useState(null);
  const [disabled, setDisaled] = useState(false);
  const [alert, setAlert] = useState({
    text: '',
    positonLeft: '',
    positionTop: '',
    show: false,
  });

  function changeTarget(id) {
    setModalIsOpen(true);
    setCurrentId(id);
    let value = target.find((t) => t.id === id).value;
    setCurrentValue(value);
  }

  const addTargetHandler = (e) => {
    setDisaled(false);
    if (e.target.value.length < 30) {
      setCurrentValue(e.target.value);
      setAlert((alert) => ({ ...alert, show: false }));
    } else {
      setDisaled(true);

      const newAlert = {
        positionLeft: e.target.getBoundingClientRect().x,
        positionTop: e.target.getBoundingClientRect().bottom,
        text: 'Сформулируйте цель четче!',
        show: true,
      };

      setAlert(newAlert);
    }
  };

  const submitTargetHandler = () => {
    let newtarget = { id: currentId, value: currentValue };
    target.splice(currentId, 1, newtarget);
    setTarget(target);
    setModalIsOpen(false);
  };

  return (
    <div className="header rounded">
      <h3 className="m-1 pt-0 text-center">Планировщик</h3>
      <ul className="targets">
        {target.map((t) => {
          return (
            <Fragment>
              <li key={t.id} onClick={() => changeTarget(t.id)}>
                <div >{t.value}</div>
                <img src={gear} />
              </li>
            </Fragment>
          );
        })}
      </ul>

      <CSSTransition
        in={modalIsOpen}
        classNames={'modal'}
        timeout={500}
        mountOnEnter
        unmountOnExit
      >
        <Modal
          onCloseModal={() => setModalIsOpen(false)}
          addTarget={addTargetHandler}
          value={currentValue}
          submitTarget={submitTargetHandler}
          disabled={disabled}
        />
      </CSSTransition>

      <Alert
        alert={alert}
        closeAlert={() => setAlert((alert) => ({ ...alert, show: false }))}
      />
    </div>
  );
};

export default Header;
