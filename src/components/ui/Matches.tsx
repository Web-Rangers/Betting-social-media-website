import React, { useState } from 'react'
import styles from '@styles/components/ui/Matches.module.css'
import Image from 'next/image'
import { MatchesByLeague } from 'src/types/queryTypes'
import { inferArrayElementType } from 'src/utils/inferArrayElementType'
import { motion } from 'framer-motion'
import { MatchStatus } from 'src/types/matchStatus'

interface MatchesInfoProps {
    leagues: MatchesByLeague,
    h3?: string,
    h2?: string,
}

type MatchType = inferArrayElementType<inferArrayElementType<MatchesByLeague>['matches']>

const Matches: React.FC<MatchesInfoProps> = (props) => {
    const { leagues, h2, h3 } = props

    return (
        <div className={styles.container}>
            {(h2 || h3) && <div className={styles.titles}>
                {h3 && <h3>{h3}</h3>}
                {h2 && <h2>{h2}</h2>}
            </div>}
            {leagues.map((league, leagueIndex) =>
                <div className={styles.league} key={`league_${leagueIndex}`}>
                    <div className={styles.leagueDescription}>
                        <div className={styles.leagueWrapper}>
                            <div className={styles.image}>
                                <Image
                                    src={league.image}
                                    height={40}
                                    width={40}
                                    alt={league.name}
                                />
                            </div>
                            <div className={styles.titles}>
                                <span>{league.country} • {league.sport.name}</span>
                                <span>{league.name}</span>
                            </div>
                        </div>
                        <div className={styles.matchesOptions}>
                            <button>
                                <Image
                                    src='/icons/live-matches.svg'
                                    alt=''
                                    height={15}
                                    width={15}
                                />
                                Live Matches
                            </button>
                            <button>
                                <Image
                                    src='/icons/chart-bubble.svg'
                                    alt=''
                                    height={15}
                                    width={15}
                                />
                                Odds
                            </button>
                            <button>
                                <Image
                                    src='/icons/chart-line.svg'
                                    alt=''
                                    height={15}
                                    width={15}
                                />
                                Statistic
                            </button>
                        </div>
                    </div>
                    <div className={styles.matches}>
                        {league.matches.map((match, index) => (
                            <Match {...match} key={`league_${leagueIndex}_match_${index}`} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const Match: React.FC<MatchType> = (props) => {
    const { status, teams, date, odds, tip_count } = props
    const [isOpen, setIsOpen] = useState(false);

    function getTag(status: MatchStatus) {
        switch (status) {
            case MatchStatus.live:
                return <div className={styles.matchLive}>Live</div>
            case MatchStatus.upcoming:
                return <span>{date}</span>
            case MatchStatus.finished:
                return <span>{date}</span>

            default:
                return <></>
        }
    }

    return (
        <div className={styles.match}>
            <div className={styles.header}>
                <div className={styles.info}>
                    <div className={styles.time}>
                        {getTag(status)}
                    </div>
                    <div className={styles.teamImages}>
                        {teams.map((team, index) => (
                            <div key={index} className={styles.teamImage}>
                                <Image
                                    src={team.image}
                                    alt={team.name}
                                    width={22}
                                    height={22}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.teamNames}>
                        {teams.map((team, index) => (
                            <div key={index} className={styles.teamName}>
                                {team.name}
                            </div>
                        ))}
                    </div>

                </div>
                <div className={styles.details}>
                    <div className={`${styles.outcome} ${styles.score}`}>
                        <span>{teams[0]?.score}</span>
                        <span>{teams[1]?.score}</span>
                    </div>
                    <div className={styles.outcome}>
                        <span>Home</span>
                        <span>{odds.home * 100}%</span>
                    </div>
                    <div className={styles.outcome}>
                        <span>Draw</span>
                        <span>{odds.draw * 100}%</span>
                    </div>
                    <div className={styles.outcome}>
                        <span>Away</span>
                        <span>{odds.away * 100}%</span>
                    </div>
                    <div
                        className={`${styles.total} ${isOpen ? styles.open : styles.closed}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {tip_count} Tip{tip_count > 1 ? 's' : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Matches;