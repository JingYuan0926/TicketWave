import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import moment from 'moment';

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
};

const thTdStyle = {
  border: '1px solid #dddddd',
  padding: '8px',
  textAlign: 'left',
};

const formatDate = (unixTimestamp) => {
  // Convert Unix timestamp (seconds) to milliseconds
  const milliseconds = unixTimestamp * 1000;
  // Create a Date object from the milliseconds
  const dateObject = new Date(milliseconds);
  // Format the date as desired (adjust format as needed)
  const formattedDate = dateObject.toLocaleString(); // Example format: "12/31/2022, 10:30:45 AM"
  return formattedDate;
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
            const formattedTransactions = results.data.map((transaction, index) => ({
              ...transaction,
              timestamp: formatDate(transaction.timestamp), // Format the timestamp
              index: index + 1,
            }));

            setTransactions(formattedTransactions);
            setTotalTransactions(formattedTransactions.length);
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
            <th style={thTdStyle}>Time</th>
            <th style={thTdStyle}>Accounts</th>
            <th style={thTdStyle}>Contract Details</th>
            <th style={thTdStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{index + 1}</td>
              <td style={thTdStyle}>{transaction.timestamp}</td>
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
