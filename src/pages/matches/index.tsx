import React, { useState } from 'react'
import { NextPage } from 'next'
import styles from '@styles/pages/Predictions.module.css'
import { trpc } from 'src/utils/trpc'
import Image from 'next/image'
import BestBookmakers from '@components/ui/BestBookmakers'
import Banner from '@components/ui/Banner'
import Filter from '@components/ui/Filter'
import TextField from '@components/ui/TextField'
import DatePicker from '@components/ui/DatePicker'
import LiveMatches from '@components/ui/LiveMatches'
import MatchesInfo from '@components/ui/MatchesInfo'

const MatchesPage: NextPage = () => {
    const { data: tips, isLoading: tipsLoading } = trpc.useQuery(['tips.getAll'])
    const { data: predictions, isLoading: predictionsLoading } = trpc.useQuery(['predictions.getAll'])
    const { data: bookmakers, isLoading: bookmakersLoading } = trpc.useQuery(['bookmakers.getAll'])
    const { data: leagues, isLoading: leaguesLoading } = trpc.useQuery(['filters.getLeagues'])
    const { data: sports, isLoading: sportsLoading } = trpc.useQuery(['filters.getSports'])
    const { data: matches, isLoading: matchesLoading } = trpc.useQuery(['matches.getAllLive'])

    if (tipsLoading || predictionsLoading || bookmakersLoading || leaguesLoading || sportsLoading) {
        return <div>Loading...</div>
    }

    if (!tips || !predictions || !bookmakers || !leagues || !sports) {
        return <div>Error...</div>
    }

    return (
        <>
            <div className={styles.mainBlock}>
                <Banner height={200} image="/images/banner-placeholder-1.png" />
            </div>
            <div className={styles.mainColumn}>
                <div className={styles.filters}>
                    <DatePicker onChange={() => { }} />
                    <Filter
                        items={leagues}
                        h3="BY COUNTRY"
                        onChange={() => { }}
                    />
                    <Filter
                        items={leagues}
                        h3="OTHER COUNTRIES"
                        onChange={() => { }}
                    />
                </div>
                <div className={styles.predictions}>
                    <MatchesInfo leagues={predictions} />
                </div>
            </div>
            <div className={styles.sideColumn}>
                <LiveMatches matches={matches} />
                <Banner height={463} image='/images/banner-placeholder-2.png' />
                <BestBookmakers bookmakers={bookmakers} />
            </div>
        </>
    )
}

export default MatchesPage