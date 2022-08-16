import React from 'react'
import styles from '@styles/components/ui/Predictions.module.css'
import Image from 'next/image'

interface PredictionsProps {
    matches: {
        time: string,
        teams: {
            name: string,
            image: string
        }[],
        predictions: {
            time: string,
            user: {
                name: string,
                image: string
                winrate: number
            },
            comment: boolean,
            outcome: string
        }[]
    }[],
    h3: string,
    h2: string,
}

const Predictions: React.FC<PredictionsProps> = (props) => {
    const { matches } = props

    return (
        <div className={styles.container}>
            <div className={styles.titles}>
                <h3>{props.h3}</h3>
                <h2>{props.h2}</h2>
            </div>
            {matches.map((match, index) => (
                <div key={index} className={styles.match}>
                    <div className={styles.header}>
                        <div className={styles.info}>
                            <div className={styles.time}>
                                <span>{match.time}</span>
                                <span>Today</span>
                            </div>
                            <div className={styles.teamImages}>
                                {match.teams.map((team, index) => (
                                    <div key={index} className={styles.teamImage}>
                                        <Image
                                            src={team.image}
                                            alt={team.name}
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className={styles.teamNames}>
                                {match.teams.map((team, index) => (
                                    <div key={index} className={styles.teamName}>
                                        {team.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.total}>{match.predictions.length} Tips</div>
                            <div className={styles.more}>Details</div>
                        </div>
                    </div>
                    <div className={styles.predictions}>
                        {match.predictions.map((prediction, index) => (
                            <div key={index} className={styles.prediction}>
                                <div className={styles.info}>
                                    <div className={styles.time}>
                                        <span>{prediction.time}</span>
                                        <span>Today</span>
                                    </div>
                                    <div className={styles.user}>
                                        <div className={styles.userImage}>
                                            <Image
                                                src={prediction.user.image}
                                                alt={prediction.user.name}
                                                width={40}
                                                height={40}
                                            />
                                        </div>
                                        <div className={styles.userInfo}>
                                            <div className={styles.userName}>{prediction.user.name}</div>
                                            <div className={styles.userWinrate}>Winrate {prediction.user.winrate * 100}%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.comment}>
                                    <Image
                                        src="/icons/comment.svg"
                                        alt="Comment"
                                        width={20}
                                        height={20}
                                    />
                                    <span>{prediction.comment ? 'With Comment' : 'Without comment'}</span>
                                </div>
                                <div className={styles.outcome}>
                                    <span>Prediction</span>
                                    <span>{prediction.outcome}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Predictions;