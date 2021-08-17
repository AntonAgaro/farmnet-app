import React from 'react';
import './CheckInfoTable.scss';

const CheckInfoTable = props => {
  return (
    <table className="table-info">
      <thead>
        <tr>
          <th>№</th>
          <th>Название товара</th>
          <th>Форма выпуска</th>
          <th>Производитель</th>
          <th>Продано товара</th>
          <th>Сумма продажи</th>
          <th>Ставка НДС</th>
          <th>Срок годности</th>
        </tr>
      </thead>
      <tbody>
        {props.checkInfo && props.checkInfo.map((item, index) => {
          const date = item.srokG.slice(0, item.srokG.search(/T/));
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.drug}</td>
              <td>{item.form}</td>
              <td>{item.fabr}</td>
              <td>{item.quantity}</td>
              <td>{item.sumRoznWNDS}</td>
              <td>{item.nds}</td>
              <td>{date}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default CheckInfoTable;