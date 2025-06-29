
export const GAIA_TOKEN = {
  CONTRACT_ADDRESS: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  WALLET_ADDRESS: 'ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7',
  SYMBOL: 'GAiA',
  NAME: 'Harmony of Gaia Token',
  DECIMALS: 18,
  INITIAL_PRICE: 0.0001,
  PUMP_FUN_URL: 'https://pump.fun/5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  NETWORK: 'Solana'
}

export const GAIA_METRICS = {
  totalSupply: 1000000000,
  marketCap: 100000,
  holders: 15420,
  volume24h: 45280.67,
  priceChange24h: 12.45
}

export const formatGaiaPrice = (price: number): string => {
  return `$${price.toFixed(6)}`
}

export const formatGaiaNumber = (num: number): string => {
  return num.toLocaleString()
}
