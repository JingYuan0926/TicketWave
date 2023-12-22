import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
};

const thTdStyle = {
  border: '1px solid #dddddd',
  padding: '8px',
  textAlign: 'left',
};

const ContractTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCSV = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/tomo_csv.csv');
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          complete: (results) => {
            setTransactions(results.data);
            setTotalTransactions(results.data.length);
          }
        });
      } catch (err) {
        console.error('Error fetching CSV:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCSV();
  }, []);

  if (isLoading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Total Transactions: {totalTransactions}</h3>

      <table className="table table-striped" style={tableStyle}>
        <thead>
          <tr>  
          <th style={thTdStyle}>No.</th>
            <th style={thTdStyle}>Transaction Hash</th>
            <th style={thTdStyle}>Accounts</th>
            <th style={thTdStyle}>Contract Details</th>
            <th style={thTdStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{index}</td>
              <td style={thTdStyle}>{transaction.hash}</td>
              <td style={thTdStyle}>{transaction.from}</td>
              <td style={thTdStyle}>{transaction.to}</td>
              <td style={thTdStyle}>{transaction.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default ContractTransactions;
