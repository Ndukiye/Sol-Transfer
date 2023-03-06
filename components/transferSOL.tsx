import { FC} from 'react'
import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from '../styles/PingButton.module.css'
import {useConnection, useWallet} from '@solana/wallet-adapter-react'
import * as web3 from '@solana/web3.js'
// const connect  = new web3.Connection(web3.clusterApiUrl('devnet'));
//const RECIEVER_PUBKEY = new web3.PublicKey("BHcGs51W3WtVj1MnetsYxJ5VNTUp8SMUCGhCrT9vMWXo") 


export const SendSOL: FC = () => {
	const {connection} = useConnection();
	const {publicKey, sendTransaction} = useWallet();
    const sender = useWallet()

    const onClick = Event  => {
		if (!connection || !publicKey) { return }
        Event.preventDefault()
        const RecieverPubkrystr =  Event.target.address.value
        const AmountInSOL: number = Event.target.amount.value

        const RECIEVER_PUBKEY = new web3.PublicKey(RecieverPubkrystr) 


		const transaction = new web3.Transaction()

		const instruction =  web3.SystemProgram.transfer({
			fromPubkey: sender.publicKey,
            toPubkey: RECIEVER_PUBKEY,
            lamports: web3.LAMPORTS_PER_SOL * AmountInSOL

		});
		transaction.add(instruction)
		sendTransaction(transaction, connection).then(sig => {
			console.log(sig)
		})
        console.log('Ping!')
    }
 

	return (
		<div className={styles.buttonContainer} >
            <p>Move SOL</p>
            <form onSubmit={onClick}>
            <input className={styles.input} id='address' type="text" placeholder='e.g. 6KMmDQnXbSM543uhjCoVUpP7tghf1c4v4u4rfqDzMNtg' /> <br />
            <input className={styles.input} id='amount' type="number" placeholder='Amount in SOL' /> <br />
            <button type='submit'  className={styles.button}>Transfer SOL</button>
              {/* <span>{balance}</span>  */}
            </form>
		
		</div>
	)
}
