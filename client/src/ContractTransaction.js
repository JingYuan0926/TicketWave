// ContractTransaction.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ContractTransaction = ({ contractAddress, ABI }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const loadTransactions = async () => {
            // Use a default provider for read-only access
            const provider = ethers.getDefaultProvider(); // This won't prompt for wallet connection
            const contract = new ethers.Contract(contractAddress, ABI, provider);

            try {
                const transactionsCount = await contract.tokenCounter();
                let transactionsData = [];
                for (let i = 0; i < transactionsCount; i++) {
                    const transaction = await contract.transactions(i);
                    transactionsData.push(transaction);
                }
                setTransactions(transactionsData);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        loadTransactions();
    }, [contractAddress, ABI]);

    return (
        <div>
            <h2>Transaction History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Owner</th>
                        <th>Time</th>
                        <th>Ticket ID</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.owner}</td>
                            <td>{new Date(transaction.time * 1000).toLocaleString()}</td>
                            <td>{transaction.ticketId.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContractTransaction;
