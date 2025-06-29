
export const GAIA_TOKEN = {
  CONTRACT_ADDRESS: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  WALLET_ADDRESS: 'ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7',
  SYMBOL: 'GAiA',
  NAME: 'GAiA Token - Powered by Harmony of Gaia',
  DECIMALS: 18,
  INITIAL_PRICE: 0.0001,
  PUMP_FUN_URL: 'https://pump.fun/5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  NETWORK: 'Solana',
  
  // BRAND CLARIFICATION - WE ARE NOT GAIA EVERWORLD
  BRAND_STATEMENT: 'GAiA Token is NOT associated with GAIA Everworld (coinmarketcap.com/currencies/gaia-everworld/). We are a completely separate, exclusive project powered by Harmony of Gaia Projects Creator Business, empowered by Culture of Harmony.',
  OFFICIAL_DISCLAIMER: 'This project is entirely independent from any other GAIA-named tokens or projects. We maintain our own unique blockchain identity and community.'
}

export const GAIA_METRICS = {
  totalSupply: 1000000000,
  marketCap: 100000,
  holders: 15420,
  volume24h: 45280.67,
  priceChange24h: 12.45,
  INITIAL_PRICE: 0.0001,
  INITIAL_HOLDERS: 15420,
  INITIAL_MARKET_CAP: 100000,
  INITIAL_VOLUME: 45280.67,
  INITIAL_TRANSACTIONS: 8750,
  NETWORK_SPEED: 2500,
  SECURITY_SCORE: 98,
  ECOSYSTEM_HEALTH: 95,
  DRAGON_POWER: 100000
}

export const formatGaiaPrice = (price: number): string => {
  return `$${price.toFixed(6)}`
}

export const formatGaiaNumber = (num: number): string => {
  return num.toLocaleString()
}
