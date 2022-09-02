import React, { useState } from 'react'
import { NextPage } from 'next'
import styles from '@styles/pages/Matches.module.css'
import { trpc } from 'src/utils/trpc'
import BestBookmakers from '@components/ui/BestBookmakers'
import Banner from '@components/ui/Banner'
import Filter from '@components/ui/Filter'
import DatePicker from '@components/ui/DatePicker'
import LiveMatches from '@components/ui/LiveMatches'
import Matches from '@components/ui/Matches'
import NestedFilter from '@components/ui/NestedFilter'

const MatchesPage: NextPage = () => {
    const { data: tips, isLoading: tipsLoading } = trpc.useQuery(['tips.getAll'])
    const { data: matches, isLoading: matchesLoading } = trpc.useQuery(['matches.getAllByLeague'])
    const { data: bookmakers, isLoading: bookmakersLoading } = trpc.useQuery(['bookmakers.getAll'])
    const { data: leagues, isLoading: leaguesLoading } = trpc.useQuery(['filters.getLeaguesByCountry'])
    const { data: sports, isLoading: sportsLoading } = trpc.useQuery(['filters.getSports'])
    const { data: liveMatches, isLoading: liveMatchesLoading } = trpc.useQuery(['matches.getAllLive'])

    if (tipsLoading || bookmakersLoading || leaguesLoading || sportsLoading || liveMatchesLoading || matchesLoading) {
        return <div>Loading...</div>
    }

    if (!tips || !liveMatches || !bookmakers || !leagues || !sports || !matches) {
        return <div>Error...</div>
    }

    return (
        <>
            <div className={styles.rightColumn}>
                <div className={styles.filters}>
                    <DatePicker onChange={() => { }} />
                    <NestedFilter
                        items={leagues}
                        h3="BY COUNTRY"
                        h2='Choose Matches'
                        onChange={() => { }}
                    />
                    <NestedFilter
                        items={leagues}
                        h3="OTHER COUNTRIES"
                        onChange={() => { }}
                    />
                </div>
            </div>
            <div className={styles.mainColumn}>
                <div className={styles.banner}>
                    <Banner height={200} image="/images/banner-placeholder-1.png" />
                </div>
                <div className={styles.predictions}>
                    <Matches
                        leagues={matches}
                        withDatePicker={false}
                    />
                </div>
                <div className={styles.sideColumn}>
                    <LiveMatches matches={liveMatches} />
                    <Banner height={463} image='/images/banner-placeholder-2.png' />
                    <BestBookmakers bookmakers={bookmakers} />
                </div>
            </div>
        </>
    )
}

export default MatchesPage