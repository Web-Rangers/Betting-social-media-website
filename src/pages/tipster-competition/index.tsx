import { NextPage } from 'next'
import React from 'react'
import { trpc } from 'src/utils/trpc'
import styles from '@styles/pages/TipsterCompetition.module.css'
import Image from 'next/image'
import { CurrentCompetition } from 'src/types/queryTypes'
import Moment from 'react-moment'

const TipsterCompetition: NextPage = () => {
    const { data: currentCompetition, isLoading: currentCompetitionLoading } = trpc.useQuery(['competitions.getCurrent'])

    if (currentCompetitionLoading) {
        return <div>Loading...</div>
    }

    if (!currentCompetition) {
        return <div>Error...</div>
    }

    return (
        <>
            <div className={styles.mainBlock}>
                <CurrentCompetition {...currentCompetition} />
            </div>
        </>
    )
}

const CurrentCompetition: React.FC<CurrentCompetition> = (props) => {
    const { endsOn, startedOn, leaders } = props

    return (
        <div className={styles.currentCompetition}>
            <Image
                src='/images/tipster-competition-background.png'
                layout='fill'
                objectFit='cover'
            />
            <h1>Free Tipster Competition</h1>
            <div className={styles.steps}>
                <span>
                    The competition will start on the <Moment date={startedOn} format="DD MMMM YYYY" /> and it will last untill the <Moment date={endsOn} format="DD MMMM YYYY" />!
                </span>
                <span>
                    You can join Optimo Bet Free Tipster Competition at any time
                </span>
                <span>
                    You are only Allowed to have one tipster account per person
                </span>
            </div>
            <h2 className={styles.rewardDistribution}>Reward Distribution</h2>
            <div className={styles.leaders}>
                {leaders[1] && <Leader {...leaders[1]} place={2} />}
                {leaders[0] && <Leader {...leaders[0]} place={1} />}
                {leaders[2] && <Leader {...leaders[2]} place={3} />}
            </div>
            <div className={styles.separator} />
            <div className={styles.duration}>
                <h2>Left before the end of the tournament</h2>
                <div className={styles.timeLeft}>
                    <Moment
                        className={styles.time}
                        duration={new Date()}
                        date={endsOn}
                        format="DD : hh : mm"
                    />
                    <div className={styles.timeHint}>
                        <span>Days</span>
                        <span>Hours</span>
                        <span>Minutes</span>
                    </div>
                </div>
                <span className={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique hendrerit ligula,
                    vitae finibus odio aliquet sit amet. Mauris semper arcu vitae neque sollicitudin lobortis
                    vitae sit amet quam. Proin viverra nulla in tellus dictum faucibus. Proin a dictum nulla.
                    Duis euismod venenatis semper. Mauris sed volutpat elit, eget egestas nulla. Pellentesque
                    vitae consequat ipsum.
                </span>
            </div>
        </div>
    )
}

const Leader: React.FC<{ name: string, image: string, prize: number, place: number }> = (props) => {
    const { image, name, place, prize } = props

    return (
        <div className={styles.leader}>
            <span className={styles.name}>{name}</span>
            <div className={styles.avatar}>
                <div className={styles.crown}>
                    <Image
                        src={`/images/competition-crown-${place}.svg`}
                        layout="fill"
                    />
                </div>
                <Image
                    src={image}
                    height={place === 1 ? 86 : 68}
                    width={place === 1 ? 86 : 68}
                    alt={name}
                />
            </div>
            <span className={styles.prize}>$ {prize}</span>
        </div>
    )
}

export default TipsterCompetition;