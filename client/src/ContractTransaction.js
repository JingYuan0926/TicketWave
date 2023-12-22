import React, { useState } from 'react';
import { parse } from 'papaparse';

const TransactionTable = () => {
  const [importedTransactions, setImportedTransactions] = useState([]);
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    parse(file, {
      complete: (result) => {
        console.log('Parsed CSV data:', result.data);
        setImportedTransactions(
          result.data.map((row, index) => ({
            txhash: row.Txhash,
            unixTime: row.UnixTime,
            from: row.From,
            to: row.To,
            contractAddress: row.ContractAddress,
            id: index + 1,
          }))
        );
      },
      header: true,
    });
  };

  const formatUnixTime = (unixTime) => {
    const date = new Date(parseInt(unixTime) * 1000);
    return date.toLocaleString(); // Adjust this as per your date format preference
  };

  return (
    <div>
      <h2>Transactions</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <table style={{ width: '100%', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '10%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '18%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Index</th>
            <th>Txhash</th>
            <th>UnixTime</th>
            <th>From</th>
            <th>To</th>
            <th>ContractAddress</th>
          </tr>
        </thead>
        <tbody>
          {importedTransactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td title={tx.txhash}>
                {tx.txhash ? tx.txhash.substring(0, 20) + '...' : ''}
              </td>
              <td>{tx.unixTime}</td>
              <td title={tx.from}>{tx.from ? tx.from.substring(0, 20) + '...' : ''}</td>
              <td title={tx.to}>{tx.to ? tx.to.substring(0, 20) + '...' : ''}</td>
              <td title={tx.contractAddress}>
                {tx.contractAddress ? tx.contractAddress.substring(0, 20) + '...' : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
