import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID

export const client = createThirdwebClient({
    clientId: clientId
});

export const contract = getContract({
    client,
    chain: defineChain(11155420),
    address: "0xe2a3d5d774Af3086FFcD8F12Cb725fCdb8d34f2D"
  });