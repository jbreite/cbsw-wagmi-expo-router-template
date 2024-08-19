import { isAddress } from "viem";

export function shortenAddress(address: `0x${string}` | undefined): string {
  if (!address || !isAddress(address)) {
    return "Invalid Address";
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
