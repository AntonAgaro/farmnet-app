import React from 'react';
import './ChecksTable.scss';

const ChecksTable = props => {
  return (
    <table className="table">
      <thead>
        <tr>
            <th>№</th>
            <th>id</th>
            <th>Дата продажи</th>
            <th>Филиал</th>
            <th>Тип операции</th>
            <th>Позиций</th>
            <th>Продано</th>
            <th>Сумма</th>
        </tr>
      </thead>
      <tbody>
        {props.checks.map((item, index) => {
          const date = new Date(item.createDate);
          return (
            <tr key={index} onClick={() => props.findCheckInfo(item.id)}>
              <td>{props.checkNumber + index + 1}</td>
              <td>{item.id}</td>
              <td>{date.toLocaleString()}</td>
              <td>{item.branch}</td>
              <td>{item.operation_type}</td>
              <td>{item.posCount}</td>
              <td>{item.sumQuantity}</td>
              <td>{item.sumRoznWNDS}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ChecksTable;