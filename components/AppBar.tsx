import {FC, useState} from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import * as web3 from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'


export const AppBar: FC = () => {
    const [balance, setbalance] = useState(0)
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    const sender = useWallet()
    const pubkey = sender.publicKey

connection.getBalance(pubkey).then(balance => {
    setbalance(balance/web3.LAMPORTS_PER_SOL)
})
    return(
        <div className={styles.AppHeader}>
           <span>Transfer of <b> SOL </b></span>
           <WalletMultiButton/>
           <span>{`Your balance: ${balance} sol`}</span>
        </div>
    )
}

