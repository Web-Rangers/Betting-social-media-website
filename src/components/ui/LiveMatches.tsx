import React from 'react'
import styles from '@styles/components/ui/LiveMatches.module.css'
import Image from 'next/image'
import { LiveMatches } from 'src/types/queryTypes'

const LiveMatches: React.FC<{ matches: LiveMatches }> = (props) => {
    const { matches } = props

    return (
        <div className={styles.liveMatches}>
            <div className={styles.liveMatchesTitle}>
                <div className={styles.liveMatchesTitleText}>
                    <h3>Watch now</h3>
                    <h2>Live Matches</h2>
                </div>
                <button>See All</button>
            </div>
            <div className={styles.liveMatchesList}>
                {matches.map((match, index) => (
                    <div className={styles.liveMatchesItem} key={`match_${index}`}>
                        <div className={styles.matchInfo}>
                            <div className={styles.matchInfoHeader}>
                                <div className={styles.matchDuration}>Live: {match.duration}</div>
                                <div className={styles.buttonContainer}>
                                    <button>
                                        <Image
                                            src="/icons/viewers.svg"
                                            width={20}
                                            height={20}
                                            alt="expand"
                                        />
                                        {match.viewer_count}
                                    </button>
                                    <button>
                                        <Image
                                            src="/icons/expand.svg"
                                            width={20}
                                            height={20}
                                            alt="expand"
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.matchLive}>
                                <Image
                                    src='/images/live-match-placeholder.png'
                                    width={340}
                                    height={99}
                                />
                            </div>
                        </div>
                        <div className={styles.matchTeams}>
                            {match.teams.map((team, index) => (
                                <div className={styles.matchTeam} key={`team_${index}`}>
                                    <div className={styles.matchTeamName}>{team.name}</div>
                                    <div className={styles.matchTeamScore}>{team.score}</div>
                                </div>
                            ))}
                            <div className={`${styles.matchDuration} ${styles.absolute}`}>{match.duration}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LiveMatches;