import React, {useState, useEffect} from 'react';
import axios from '../axios/axios';

import Modal from '../components/Modal';
import Alert from '../components/Alert';

import {CSSTransition} from 'react-transition-group';

export default function Header() {
  const [targets, setTarget] = useState([
    {id: 0, value: ''},
    {id: 1, value: ''},
    {id: 2, value: ''},
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/header.json');
      setTarget(result.data);
    };

    fetchData();
  }, []);

  function changeTargetHandler(id) {
    setModalIsOpen(true);
    setCurrentId(id);
    let value = targets.find(t => t.id === id).value;
    setCurrentValue(value);
  }

  const addTargetHandler = e => {
    setDisaled(false);
    if (e.target.value.length < 30) {
      setCurrentValue(e.target.value);
      setAlert(alert => ({...alert, show: false}));
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

  const submitTargetHandler = async () => {
    let newTarget = [...targets];

    console.log(newTarget);
    newTarget = newTarget.map(t => {
      if (t.id === currentId) {
        t.value = currentValue;
      }
      return t;
    });
    setDisaled(true);
    setModalIsOpen(false);
    console.log(targets);
    console.log(newTarget);

    try {
      await axios.put('/header.json', newTarget);
      console.log('put');
      setDisaled(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="header rounded">
      <h3 className="m-1 pt-0 text-center">Планировщик</h3>
      <ul className="targets">
        {targets.map(t => {
          return (
            <li key={t.id} onClick={() => changeTargetHandler(t.id)}>
              <div>{t.value}</div>
              <i className="fa fa-book" aria-hidden="true"></i>
            </li>
          );
        })}
      </ul>

      <CSSTransition
        in={modalIsOpen}
        classNames={'modal'}
        timeout={200}
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
        closeAlert={() => setAlert(alert => ({...alert, show: false}))}
      />
    </div>
  );
}
