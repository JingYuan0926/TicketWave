// In ethereum.d.ts

import { ExternalProvider } from '@ethersproject/providers';

interface Ethereum {
  request: ({ method }: { method: string }) => Promise<any>;
}

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}



