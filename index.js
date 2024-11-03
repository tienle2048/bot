const Web3 = require('web3')
const web3 = new Web3('https://base-mainnet.infura.io/v3/200a54a78d294101bbd166a319063408')
const web3Socket = new Web3('wss://base-mainnet.infura.io/ws/v3/200a54a78d294101bbd166a319063408')
const contractUni = '0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24'

const abiUni = [
  {
    inputs: [
      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
      {internalType: 'uint256', name: 'amountOutMin', type: 'uint256'},
      {internalType: 'address[]', name: 'path', type: 'address[]'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'}
    ],
    name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

const keyAir1 = {
  address: process.env.ADDRESS,
  privateKey: process.env.PRIVATEKEY
}

const tokenIn = '0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b'
const tokenOutTest = '0x8adcec50A0595cB91ba5989d9a0844148c234539'

const getTokenAddress = data => {
  const adad = web3.eth.abi.decodeParameters(['uint256', 'address', 'address', 'address', 'address', 'address'], data)
  return [adad[1], adad[5]]
}
const amountSwap = 10000000000000000000n
const mainAccount = '0xB31E3bbb334882f13C3e57e21a4B5653C50748E2'

const contract = new web3.eth.Contract(abiUni, contractUni)

const logTele = mess => {
  fetch(`https://api.telegram.org/bot7917519312:AAGAfMOk9QOGohyECmjAPgRK71TFlxMLZlg/sendMessage?chat_id=-1002295398585&text=${mess}`)
}

const socket = async () => {
  web3Socket.eth
    .subscribe(
      'logs',
      {
        address: '0x94Bf9622348Cf5598D9A491Fa809194Cf85A0D61',
        topics: ['0xf9d151d23a5253296eb20ab40959cf48828ea2732d337416716e302ed83ca658']
      },
      function (error, result) {
        // if (!error) console.log(result)
      }
    )
    .on('connected', function (subscriptionId) {
      console.log(subscriptionId)
    })
    .on('data', async function (log) {
      console.log('🚀 ~ log:', log)
      try {
        console.log('hash    ', log.transactionHash)
        const [tokenOut, pair] = getTokenAddress(log.data)
        logTele(`new Token ${tokenOut}`)
        logTele(`https://dexscreener.com/base/${pair}`)
      } catch (err) {
        console.log('🚀 ~ err:', err)
      }
    })
}

socket()

