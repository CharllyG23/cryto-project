const TRADE_COINS = [
    {
        key: 'BTC',
        name: 'Bitcoin'
    },
    {
        key: 'BCH',
        name: 'Bitcoin Cash'
    },
    {
        key: 'ETH',
        name: 'Ethereum'
    },
    {
        key: 'LTC',
        name: 'Litecoin'
    },
    {
        key: 'PAXG',
        name: 'Pax Gold'
    },
    {
        key: 'USDC',
        name: 'USD Coin'
    },
    {
        key: 'XRP',
        name: 'XRP'
    },
    {
        key: 'ADA',
        name: 'Cardano'
    },
    {
        key: 'DOGE',
        name: 'Dogecoin'
    },
    {
        key: 'SOL',
        name: 'Solana'
    },
    {
        key: 'SHIB',
        name: 'Shiba Inu'
    },
    {
        key: 'DOT',
        name: 'Polkadot'
    },
    {
        key: 'FIL',
        name: 'Filecoin'
    },
    {
        key: 'ATOM',
        name: 'Cosmos'
    },
    {
        key: 'ICP',
        name: 'Internet Computer'
    },
    {
        key: 'AVAX',
        name: 'Avalanche'
    },
    {
        key: 'ALGO',
        name: 'Algorand'
    },
    {
        key: 'XTZ',
        name: 'Tezos'
    },
    {
        key: 'WLUNA',
        name: 'Wrapped LUNA Token'
    },
    {
        key: 'XLM',
        name: 'Stellar'
    },
    {
        key: 'COTI',
        name: 'COTI'
    },
    {
        key: 'MINA',
        name: 'Mina'
    },
    {
        key: 'ROSE',
        name: 'Oasis Network'
    },
    {
        key: 'STX',
        name: 'Stacks'
    },
    {
        key: 'NODL',
        name: 'Nodle'
    },
    {
        key: 'MBRL',
        name: 'MBRL'
    },
    {
        key: 'APT',
        name: 'Aptos'
    },
    {
        key: 'ABFY',
        name: 'Ambify'
    },
    {
        key: 'AAVE',
        name: 'Aave'
    },
    {
        key: 'BAL',
        name: 'Balancer'
    },
    {
        key: 'COMP',
        name: 'Compound'
    },
    {
        key: 'CRV',
        name: ''
    },
    {
        key: 'DAI',
        name: 'Dai'
    },
    {
        key: 'KNC',
        name: 'Kyber Network'
    },
    {
        key: 'MKR',
        name: 'Maker'
    },
    {
        key: 'REN',
        name: 'Ren'
    },
    {
        key: 'SNX',
        name: 'Synthetix'
    },
    {
        key: 'UMA',
        name: 'Uma'
    },
    {
        key: 'UNI',
        name: 'Uniswap'
    },
    {
        key: 'YFI',
        name: 'yearn.finance'
    },
    {
        key: 'ZRX',
        name: '0x'
    },
    {
        key: 'BNT',
        name: 'BANCOR'
    },
    {
        key: 'SUSHI',
        name: 'SuchiSwap'
    },
    {
        key: 'DYDX',
        name: 'dYdX'
    },
    {
        key: 'ALCX',
        name: 'Alchemix'
    },
    {
        key: 'REQ',
        name: 'Request'
    },
    {
        key: 'MIR',
        name: 'Mirror Protocol'
    },
    {
        key: 'SYN',
        name: 'Synapse'
    },
    {
        key: 'PERP',
        name: 'Perpetual Protocol'
    },
    {
        key: 'LQTY',
        name: 'Liquity'
    },
    {
        key: 'TRU',
        name: 'TrueFi'
    },
    {
        key: 'METIS',
        name: 'MetisDAO'
    },
    {
        key: 'BADGER',
        name: 'Badger DAO'
    },
    {
        key: 'AGIX',
        name: 'SingularityNET'
    },
    {
        key: 'SRM',
        name: 'Serum'
    },
    {
        key: 'FARM',
        name: 'Harvest Finance'
    },
    {
        key: 'ALPHA',
        name: 'Alpha Venture Dao'
    },
    {
        key: 'STG',
        name: 'Stargate FInance'
    },
    {
        key: 'POLY',
        name: 'Polymath'
    },
    {
        key: 'MVI',
        name: 'Metaverse Index'
    },
    {
        key: 'DPI',
        name: 'DeFi Pulse Index'
    },
    {
        key: 'ACH',
        name: 'Alchemy Pay'
    },
    {
        key: 'ACMFT',
        name: 'AC Milan'
    },   
    {
        key: 'ALICE',
        name: 'MyNeighborAlice'
    },
    {
        key: 'ALLFT',
        name: 'Alliance'
    },
    
    {
        key: 'AMFT',
        name: 'Aston Martin Cognizant'
    },
    {
        key: 'AMP',
        name: 'Amp'
    },
    {
        key: 'ANKR',
        name: 'ANKR'
    },
    {
        key: 'ANT',
        name: 'Aragon'
    },
    
    {
        key: 'ASRFT',
        name: 'AS Roma'
    },
    {
        key: 'ATLAS',
        name: 'Star Atlas'
    },
    {
        key: 'ATMFT',
        name: 'Fan Token ATM'
    },
    {
        key: 'AUDIO',
        name: 'Audius'
    },  
    {
        key: 'AXS',
        name: 'Axie Infinity'
    },
    
    {
        key: 'BAND',
        name: 'Band Protocol'
    },
    {
        key: 'BARFT',
        name: 'FC Barcelona'
    },
    {
        key: 'BAT',
        name: 'Basic Attention token'
    },
    {
        key: 'BICO',
        name: 'Biconomy'
    },
    {
        key: 'BLZ',
        name: 'Bluzelle'
    },
    
    {
        key: 'BTRST',
        name: 'Braintrust'
    },
    {
        key: 'CAIFT',
        name: 'Fan Token CAI'
    }, 
    {
        key: 'CEEK',
        name: 'CEEK VR'
    },
    {
        key: 'CHZ',
        name: 'Chiliz'
    },
    {
        key: 'CITYFT',
        name: 'Manchester City FC'
    },
    {
        key: 'CLV',
        name: 'Clover Finance'
    },
    
    {
        key: 'CTSI',
        name: 'Cartesi'
    },
    {
        key: 'CVC',
        name: 'Civic'
    },
    {
        key: 'CVX',
        name: 'Convex Finance'
    },
    
    {
        key: 'DG',
        name: 'Decentral Games'
    },
    {
        key: 'DIA',
        name: 'DIA'
    },
    {
        key: 'ENJ',
        name: 'Enjin Coin'
    },
    {
        key: 'ENS',
        name: 'Ethereum Name Service'
    }, 
    {
        key: 'ERN',
        name: 'Ethernity'
    },
    {
        key: 'FET',
        name: 'Fetch.ai'
    },
    {
        key: 'FIL',
        name: 'Filecoin'
    },
    {
        key: 'FLOKI',
        name: 'Floki Inu'
    },
    {
        key: 'FLOW',
        name: 'Flow'
    },
    {
        key: 'USDP',
        name: 'Pax Dollar'
    },
    {
        key: 'WBTC',
        name: 'Wrapped Bitcoin'
    }, 
    
    
]

export { TRADE_COINS }