import React from 'react'
import styles from '@styles/components/dashboard/SubscriptionTab.module.css'
import sharedStyles from '@styles/components/dashboard/shared.module.css'
import { trpc } from 'src/utils/trpc'

const SubscriptionTab: React.FC = () => {
    const { data, isLoading } = trpc.useQuery(['user.getSubscriptionInfo'])

    return (
        <div className={styles.subscriptionTab}>
            <div className={sharedStyles.row}>
                <div className={`${sharedStyles.block} ${sharedStyles.wide}`}>
                    TODO, waiting for redesign
                </div>
            </div>
        </div>
    )
}

export default SubscriptionTab
