import type { NextPage } from 'next'
import styles from '@styles/pages/Live-Matches.module.css'
import React from 'react'
import { trpc } from 'src/utils/trpc'
import Filter from '@components/ui/Filter'

const LiveMatches: NextPage = () => {
    const { data: filters, isLoading: filtersLoading } = trpc.useQuery(['filters.getAll'])

    if (filtersLoading) {
        return <div>Loading...</div>
    }

    if (!filters) {
        return <div>Error</div>
    }

    return (
        <>
            <div className={styles.sideColumn}>
                <Filter
                    h3='Top Leagues'
                    h2='Football Leagues'
                    items={filters}
                    onChange={() => { }}
                />
            </div>
            <div className={styles.mainColumn}>

            </div>
        </>
    )
}

export default LiveMatches;