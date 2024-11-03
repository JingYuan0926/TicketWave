import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID

export const client = createThirdwebClient({
    clientId: clientId
});

export const contract = getContract({
    client,
    chain: defineChain(11155420),
    address: "0xd2e14bb75304F967656febE097f4E91D9d21a653"
  });