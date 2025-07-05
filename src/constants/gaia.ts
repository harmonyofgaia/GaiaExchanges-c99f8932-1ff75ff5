
export const GAIA_TOKEN = {
  // Correct GAiA Token addresses (NOT GAIA Everworld)
  CONTRACT_ADDRESS: 't7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
  WALLET_ADDRESS: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  
  // Fee collection wallet
  FEE_COLLECTION_WALLET: 'ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7',
  
  // Community vault wallet
  COMMUNITY_VAULT_WALLET: '6DAj3dhtwBDv3HY3UYw1ykjHGRLTU7yMKQmCn8bNoTpW',
  
  // Token details
  NAME: 'GAiA',
  SYMBOL: 'GAiA',
  DECIMALS: 9,
  NETWORK: 'Solana',
  PLATFORM: 'Pump.fun',
  
  // Important: NOT GAIA Everworld
  DISCLAIMER: 'This is GAiA Token by Harmony of Gaia, NOT GAIA Everworld'
}

export const EXCHANGE_INTEGRATIONS = {
  BINANCE: {
    enabled: true,
    apiUrl: 'https://api.binance.com/api/v3',
    symbol: 'GAIAUSDT'
  },
  COINBASE: {
    enabled: true,
    apiUrl: 'https://api.pro.coinbase.com',
    symbol: 'GAIA-USD'
  },
  COINMARKETCAP: {
    enabled: true,
    apiUrl: 'https://pro-api.coinmarketcap.com/v1',
    contractAddress: GAIA_TOKEN.CONTRACT_ADDRESS
  }
}
