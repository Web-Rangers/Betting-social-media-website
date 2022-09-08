import type { GetStaticProps, NextPage } from 'next'
import styles from '@styles/pages/Live-Matches.module.css'
import React from 'react'
import { trpc } from 'src/utils/trpc'
import Filter from '@components/ui/Filter'
import Matches from '@components/ui/Matches'
import { createSSGHelpers } from '@trpc/react/ssg'
import { appRouter } from 'src/server/router'
import { createContext } from 'src/server/router/context'
import superjson from 'superjson';

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
                <Matches
                    leagues={matches}
                    withLiveMatchesButton={false}
                    withDatePicker={false}
                />
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = createSSGHelpers({
        router: appRouter,
        ctx: await createContext(),
        transformer: superjson,
    });

    await ssg.prefetchQuery('filters.getLeagues')
    await ssg.prefetchQuery('matches.getAllByLeague')

    return {
        props: {
            trpcState: ssg.dehydrate(),
        },
        revalidate: 60,
    };
}

export default LiveMatches;