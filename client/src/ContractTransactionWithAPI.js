import React, { useState, useEffect, useCallback } from 'react';

function ContractTransactions({ contractAddress }) {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTransactions = useCallback(async () => {
        const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === '1' && data.message === 'OK') {
                setTransactions(data.result);
            } else {
                console.error('Etherscan API error:', data.result);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
        setIsLoading(false);
    }, [contractAddress]); // dependency array includes contractAddress

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]); // dependency array includes fetchTransactions

    return (
        <div>
            <h3>Contract Transactions</h3>
            {isLoading ? (
                <p>Loading transactions...</p>
            ) : transactions.length > 0 ? (
                <ul>
                    {transactions.map(tx => (
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
