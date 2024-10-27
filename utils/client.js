import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID

export const client = createThirdwebClient({
    clientId: clientId
});

export const contract = getContract({
    client,
    chain: defineChain(11155420),
    address: "0x408b8c461EAc9733FfC97791226A02C55BAE8Dea"
  });