import React, { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData/fetchData';
import Pagination from '../Components/Pagination/Pagination';
import ChecksTable from '../Components/ChecksTable/ChecksTable';

import './App.scss';
import Spinner from '../Components/Spinner/Spinner';
import Modal from '../Components/Modal/Modal';

const App = () => {
  const [checks, setChecks] = useState([]);
  const [checksInfo, setChecksInfo] = useState([]);
  const [currentsCheks, setCurrentChecks] = useState([]);
  const [checkNumber, setCheckNumber] = useState(0);
  const [isModalActive, setModalActive] = useState(false);
  const [currentCheckId, setCurrentCheckId] = useState(0);
  const [currentCheckInfo, setCurrentCheckInfo] = useState([]);

  useEffect(() => {
    fetchData(process.env.PUBLIC_URL + '/tables/cheksWithId.json')
      .then(res => setChecks(res));
    
    fetchData(process.env.PUBLIC_URL + '/tables/checkInfoWithId.json')
      .then(res => setChecksInfo(res));
  }, []);

  const onPageChanged = data => {
    const {currentPage, pageLimit} = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentsChecks = checks.slice(offset, offset + pageLimit);

    setCheckNumber(offset);
    setCurrentChecks(currentsChecks);
  }

  const totalChecksLength = checks.length;

  const findCheckInfo = (id) => {
    const res = checksInfo.filter(item => item.checkId === id);
    setCurrentCheckId(id);
    setModalActive(true);
    setCurrentCheckInfo(res);
  }

  return (
    <div className="App">
      <h1>Список продаж:</h1>
      {checks.length && checksInfo.length ? 
        <>
        <ChecksTable checks={currentsCheks} checkNumber={checkNumber} findCheckInfo={findCheckInfo}/>
        <Pagination 
        totalRecords={totalChecksLength} 
        pageLimit={20} 
        pageNeighbours={1}
        onPageChanged={onPageChanged}
      />
        </> : <Spinner/>
      }
      <Modal 
        isActive={isModalActive} 
        setModalActive={setModalActive}
        currentCheckId={currentCheckId}
        checkInfo={currentCheckInfo}  
        />
    </div>
  );
}

export default App;
