import Image from 'next/image'
import React from 'react'
import { trpc } from 'src/utils/trpc'
import styles from '@styles/components/dashboard/WithdrawTab.module.css'

const WithdrawTab: React.FC = () => {
    const { data, isLoading } = trpc.useQuery(['user.getWithdrawInfo'])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>Error...</div>
    }

    return (
        <div className={styles.withdrawTab}>
            <div className={styles.row}>
                <div
                    id={styles.withdrawBalance}
                    className={`${styles.block} ${styles.wide} ${styles.positive}`}
                >
                    <div>
                        <div className={styles.image}>
                            <Image
                                src='/images/dashboard/wallet.svg'
                                height={60}
                                width={60}
                            />
                        </div>
                        <div className={styles.text}>
                            <h4>Pending Balance</h4>
                            <span>$ {data.pendingBalance}</span>
                        </div>
                    </div>
                    <div>
                        <h5>Cash that can be withdrawn right now</h5>
                        <WithdrawButton balance={data.availableBalance} />
                    </div>
                </div>
                <div
                    id={styles.withdrawTotal}
                    className={`${styles.block} ${styles.narrow}`}
                >
                    <div className={styles.image}>
                        <Image
                            src='/images/dashboard/total.svg'
                            height={60}
                            width={60}
                        />
                    </div>
                    <div className={styles.text}>
                        <h4>Pending Balance</h4>
                        <span>$ {data.totalEarned}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const WithdrawButton: React.FC<{ balance: number }> = (props) => {
    const { balance } = props
    // TODO withdraw modal
    return (
        <button className={styles.withdrawButton}>
            <span>Withdraw</span>
            <span>$ {balance}</span>
        </button>
    )
}

export default WithdrawTab