import type { NextPage } from 'next'
import styles from '@styles/pages/Live-Matches.module.css'
import React from 'react'
import { trpc } from 'src/utils/trpc'
import Filter from '@components/ui/Filter'
import Matches from '@components/ui/Matches'

const LiveMatches: NextPage = () => {
    const { data: filters, isLoading: filtersLoading } = trpc.useQuery(['filters.getLeagues'])
    const { data: matches, isLoading: matchesLoading } = trpc.useQuery(['matches.getAllByLeague'])

    if (filtersLoading || matchesLoading) {
        return <div>Loading...</div>
    }

    if (!filters || !matches) {
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
                <Matches leagues={matches} />
            </div>
        </>
    )
}

export default LiveMatches;