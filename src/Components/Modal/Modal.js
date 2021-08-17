import React from 'react';
import CheckInfoTable from '../CheckInfoTable/CheckInfoTable';
import './Modal.scss';

const Modal = props => {
  const {isActive, setModalActive, currentCheckId, checkInfo} = props;
  const modalClasses = ['modal'];
  const modalContentClasses = ['modal-content'];
  if (isActive) {
    modalClasses.push('modal--active');
    modalContentClasses.push('modal-content--active');
  }

  return (
    <div className={modalClasses.join(' ')} onClick={() => setModalActive(false)}>
      <div className={modalContentClasses.join(' ')} onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">Информация по чеку № {currentCheckId}</h3>
        <CheckInfoTable checkInfo={checkInfo}/>
      </div>
    </div>
  )
}

export default Modal;