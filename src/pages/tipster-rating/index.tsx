import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import styles from "@styles/pages/TipsterRating.module.css"
import { inferQueryOutput, trpc } from 'src/utils/trpc'
import Image from 'next/image';
import Slider from '@components/ui/Slider';
import type { CurrentCompetition, Tipsters } from 'src/types/queryTypes';
import { inferArrayElementType } from 'src/utils/inferArrayElementType';
import * as portals from 'react-reverse-portal';
import { AnimatePresence } from 'framer-motion';
import Moment from 'react-moment';
import BestBookmakers from '@components/ui/BestBookmakers';
import LiveMatches from '@components/ui/LiveMatches';
import Banner from '@components/ui/Banner';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TipsterTable from '@components/ui/TipsterTable';
import TipsterModal from '@components/ui/TipsterModal';
import { PortalContext } from 'src/utils/portalContext';

const TipsterRating: React.FC = () => {
    const { data: tipsters, isLoading: tipstersLoading } = trpc.useQuery(['tipsters.getAll']);
    const { data: bookmakers, isLoading: bookmakersLoading } = trpc.useQuery(['bookmakers.getAll'])
    const { data: liveMatches, isLoading: liveMatchesLoading } = trpc.useQuery(['matches.getAllLive'])
    const { data: currentCompetition, isLoading: currentCompetitionLoading } = trpc.useQuery(['competitions.getCurrent'])
    const portalNode = useMemo(() => {
        if (typeof window === "undefined") {
            return null;
        }
        return portals.createHtmlPortalNode({
            attributes: {
                style: "position: absolute; top: 0; left: 0;"
            }
        });
    }, []);


    if (tipstersLoading || bookmakersLoading || liveMatchesLoading || currentCompetitionLoading) {
        return <div>Loading...</div>
    }

    if (!tipsters || !bookmakers || !liveMatches || !currentCompetition) {
        return <div>Error...</div>
    }

    return (
        <>
            <PortalContext.Provider value={{ portalNode: portalNode }}>
                {portalNode && <portals.OutPortal node={portalNode} />}
                <div className={styles.mainBlock}>
                    <VerifiedTipsters tipsters={tipsters} portalNode={portalNode} />
                </div>
                <div className={styles.mainColumn}>
                    <TipsterTable tipsters={tipsters} />
                    <Banner image='/images/banner-placeholder-1.png' height={200} />
                </div>
                <div className={styles.sideColumn}>
                    <CountdownTimer {...currentCompetition} />
                    <BestBookmakers bookmakers={bookmakers} />
                    <LiveMatches matches={liveMatches} />
                    <Banner image='/images/banner-placeholder-2.png' height={463} />
                </div>
            </PortalContext.Provider>
        </>
    )
}

const VerifiedTipsters: React.FC<{ tipsters: Tipsters, portalNode: portals.HtmlPortalNode | null }> = (props) => {
    const { tipsters } = props;
    const _tipsters = sliceIntoChunks(tipsters, 3);

    function sliceIntoChunks(arr: Tipsters, chunkSize: number) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    return (
        <div className={styles.verifiedTipsters}>
            <div className={styles.verifiedTipstersBackground}>
                <Image
                    src="/images/stadium-background.png"
                    layout='fill'
                    objectFit='cover'
                />
            </div>
            <h2 className={styles.verifiedTipstersTitle}>Optimo.com Verified Tipsters</h2>
            <span className={styles.verifiedTipstersSubtitle}>
                Betting on sports can be really profitable if you have the right knowledge
                in place. Following betting tipsters is certainly wise decision as it helps
                you leverage their expertise and analyses in your favor. Here you can find
                and follow verified by us tipsters. By starting to follow some of the betting
                experts you will receive optional notification each time they post a new
                betting tip on the site.
            </span>
            <div className={styles.verifiedTipstersSlider}>
                <Slider showArrows={true}>
                    {_tipsters.map((tipstersChunk, index) => (
                        <div className={styles.tipsterSlide} key={`tipster_slide_${index}`}>
                            {tipstersChunk.map((tipster, index) => (
                                <TipsterCard key={`tipster_slide_item_${index}`}  {...tipster} />
                            ))}
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

const TipsterCard: React.FC<inferArrayElementType<Tipsters>> = (props) => {
    const { avgProfit, image, name, subscriptionCost, winrate, sport } = props
    const [following, setFollowing] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <>
            <PortalContext.Consumer>
                {({ portalNode }) => portalNode &&
                    <portals.InPortal node={portalNode}>
                        <AnimatePresence initial={false}>
                            {modalOpen && <TipsterModal {...props} onClose={() => setModalOpen(false)} />}
                        </AnimatePresence>
                    </portals.InPortal>
                }
            </PortalContext.Consumer>
            <div className={styles.tipsterCard}>
                <div className={styles.mainInfo}>
                    <div className={styles.avatar}>
                        <Image
                            src={image}
                            height={80}
                            width={80}
                        />
                        <span>{name}</span>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.header}>
                            <div className={styles.sport}>
                                <Image
                                    src={sport.image}
                                    height={46}
                                    width={46}
                                />
                                <span>Top {sport.name} Tipster</span>
                            </div>
                            <button onClick={() => setFollowing(!following)}>
                                <Image
                                    src={following ? '/icons/following.svg' : '/icons/follow.svg'}
                                    height={20}
                                    width={20}
                                />
                                <span>{following ? 'Following' : 'Follow'}</span>
                            </button>
                        </div>
                        <div className={styles.stats}>
                            <div>
                                <h4>Hit rate</h4>
                                <span>{winrate * 100}%</span>
                            </div>
                            <div>
                                <h4>Avg. Mothly Profit</h4>
                                <span>$ {avgProfit}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.subscriptionInfo}>
                    <div>
                        <h4>$ {subscriptionCost}/MO</h4>
                        <span>How to subscribe?</span>
                    </div>
                    <button onClick={() => setModalOpen(!modalOpen)}>
                        Subscribe
                    </button>
                </div>
            </div>
        </>

    )
}

const CountdownTimer: React.FC<CurrentCompetition> = (props) => {
    const { endsOn, startedOn } = props;
    const [progress, setProgress] = useState(((new Date().getTime() - startedOn.getTime()) / (endsOn.getTime() - startedOn.getTime())) * 100)

    function calculateProgress() {
        const currentTime = new Date().getTime();
        const startTime = startedOn.getTime();
        const targetTime = endsOn.getTime();
        const res = ((currentTime - startTime) / (targetTime - startTime)) * 100
        setProgress(res)
    }

    useEffect(() => {
        const timer = setInterval(calculateProgress, 60000);
        return () => clearInterval(timer)
    }, [])

    return (
        <div className={styles.timer}>
            <div className={styles.background}>
                <Image
                    src='/images/competition-timer-background.png'
                    layout='fill'
                    objectFit='cover'
                />
            </div>
            <div className={styles.header}>
                <h3>Free Tipster Competition</h3>
                <span>Left before the end of the tournament</span>
            </div>
            <div className={styles.progress}>
                <CircularProgressbarWithChildren
                    value={progress}
                    maxValue={100}
                    counterClockwise
                    styles={{
                        path: {
                            strokeLinecap: 'round',
                            strokeWidth: '4px',
                            stroke: '#2CD114'
                        },
                        trail: {
                            strokeWidth: '1px',
                            stroke: '#FFFFFF80'
                        }
                    }}
                >
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
                </CircularProgressbarWithChildren>
            </div>
            <div className={styles.rules}>
                <span>Take a tour of competition rules</span>
                <button>Learn More</button>
            </div>
        </div>
    )

}

export default TipsterRating;
