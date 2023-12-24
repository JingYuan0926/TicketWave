import React from 'react';

const NFTCard = ({ nft }) => {
    return (
        <div className='card nft-card'>
            <img src={nft.meta.content[1].url} className='card-image'/>
            <div className='card-content-item'>
                Contract Address: 
            </div>
            <div className='card address'>
                 {nft.contractAddress}
            </div>
            <div className='card-content-item'>
                Collection Address: 
            </div>
            <div className='card-content'>
                {nft.collection}
            </div>
            <div className='card-content-item'>
                NFT Name: 
            </div>
            <div className='card-content'>
             {nft.meta.name}
            </div>
        </div>
    )
}

export default NFTCard;