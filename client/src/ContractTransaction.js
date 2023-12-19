import React, { useState, useEffect } from 'react';

function ContractTransactions({ contractAddress }) {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchTransactions();
    }, [contractAddress]); // Fetch once on component mount

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex < transactions.length) {
                setCurrentIndex(currentIndex + 1);
            } else {
                // Optionally, you can fetch new transactions here if you expect new ones to come in frequently
                // fetchTransactions();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, transactions]); // Depend on currentIndex and transactions

    const fetchTransactions = async () => {
        setIsLoading(true);
        const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === '1' && data.message === 'OK') {
                setTransactions(data.result);
                setCurrentIndex(1); // Start displaying from the first transaction
            } else {
                console.error('Etherscan API error:', data.result);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Render logic
    const displayedTransactions = transactions.slice(0, currentIndex);

    return (
        <div>
            <h3>Contract Transactions</h3>
            {isLoading ? (
                <p>Loading transactions...</p>
            ) : displayedTransactions.length > 0 ? (
                <ul>
                    {displayedTransactions.map(tx => (
                        <li key={tx.hash}>
                            Hash: {tx.hash} | From: {tx.from} | To: {tx.to} | Value: {tx.value}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions found.</p>
            )}
        </div>
    );
}

export default ContractTransactions;
