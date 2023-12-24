import React from "react";

const NFTCard = ({nfts}) => {
  return(
    <div className='nft-container'>
        {nfts.map((nft, index) => {
            return <NFTCard nft={nft} key={index}/>
        })
            }
    </div>
  )
}

export default NFTCard;