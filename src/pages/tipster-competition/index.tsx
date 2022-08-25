import { NextPage } from 'next'
import React, { useMemo } from 'react'
import { trpc } from 'src/utils/trpc'
import styles from '@styles/pages/TipsterCompetition.module.css'
import Image from 'next/image'
import { CurrentCompetition } from 'src/types/queryTypes'
import Moment from 'react-moment'
import * as portals from 'react-reverse-portal'
import { PortalContext } from 'src/utils/portalContext'
import TipsterTable from '@components/ui/TipsterTable'
import TextField from '@components/ui/TextField'
import Dropdown from '@components/ui/Dropdown'

const TableDropdownItems = [
    {
        name: '1-10 Months',
        id: '1'
    },
    {
        name: '1-5 Months',
        id: '2'
    },
    {
        name: '1-2 Months',
        id: '3'
    },
    {
        name: '1 Month',
        id: '4'
    },
]

const TipsterCompetition: NextPage = () => {
    const { data: currentCompetition, isLoading: currentCompetitionLoading } = trpc.useQuery(['competitions.getCurrent'])
    const { data: tipsters, isLoading: tipstersLoading } = trpc.useQuery(['tipsters.getAll'])
    const portalNode = useMemo(() => {
        if (typeof window === "undefined") {
            return null;
        }
        return portals.createHtmlPortalNode({
            attributes: {
                style: "position: absolute; top: 0; left: 0;"
            }
        });
    }, [])

    if (currentCompetitionLoading || tipstersLoading) {
        return <div>Loading...</div>
    }

    if (!currentCompetition || !tipsters) {
        return <div>Error...</div>
    }

    return (
        <>
            <PortalContext.Provider value={{ portalNode: portalNode }}>
                {portalNode && <portals.OutPortal node={portalNode} />}
                <div className={styles.mainBlock}>
                    <CurrentCompetition {...currentCompetition} />
                </div>
                <div className={styles.mainColumn}>
                    <div className={styles.table}>
                        <h2>Top 100 Tipsters</h2>
                        <div className={styles.tableControls}>
                            <TextField icon='/icons/search.svg' placeholder='Search for tipsters' />
                            <div>
                                <Dropdown
                                    items={TableDropdownItems}
                                    onSelect={() => { }}
                                    label="Tipsters by:"
                                />
                            </div>
                        </div>
                        <TipsterTable tipsters={tipsters} pageSize={10} />
                    </div>
                </div>
                <div className={styles.sideColumn}>
                </div>
            </PortalContext.Provider>
        </>
    )
}

const CurrentCompetition: React.FC<CurrentCompetition> = (props) => {
    const { endsOn, startedOn, leaders } = props

    return (
        <div className={styles.currentCompetition}>
            <div className={styles.share}>
                <Image
                    src='/icons/share.svg'
                    height={24}
                    width={24}
                />
            </div>
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