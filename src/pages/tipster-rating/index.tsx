import React, { createContext, useContext, useMemo, useState } from 'react'
import styles from "@styles/pages/TipsterRating.module.css"
import { inferQueryOutput, trpc } from 'src/utils/trpc'
import Image from 'next/image';
import Slider from '@components/ui/Slider';
import type { Tipsters } from 'src/types/queryTypes';
import { inferArrayElementType } from 'src/utils/inferArrayElementType';
import * as portals from 'react-reverse-portal';
import { AnimatePresence, AnimationProps, motion, Variant } from 'framer-motion';
import Moment from 'react-moment';
import BestBookmakers from '@components/ui/BestBookmakers';
import LiveMatches from '@components/ui/LiveMatches';
import Banner from '@components/ui/Banner';

interface IPortalContext {
    portalNode: portals.HtmlPortalNode | null
}

const PortalContext = createContext<IPortalContext>({ portalNode: null });

const TipsterRating: React.FC = () => {
    const { data: tipsters, isLoading: tipstersLoading } = trpc.useQuery(['tipsters.getAll']);
    const { data: bookmakers, isLoading: bookmakersLoading } = trpc.useQuery(['bookmakers.getAll'])
    const { data: liveMatches, isLoading: liveMatchesLoading } = trpc.useQuery(['matches.getAllLive'])
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


    if (tipstersLoading || bookmakersLoading || liveMatchesLoading) {
        return <div>Loading...</div>
    }

    if (!tipsters || !bookmakers || !liveMatches) {
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
                    a
                </div>
                <div className={styles.sideColumn}>
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
    const portalCotext = useContext(PortalContext)
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <>
            {portalCotext?.portalNode &&
                <portals.InPortal node={portalCotext.portalNode}>
                    <AnimatePresence initial={false}>
                        {modalOpen && <TipsterModal {...props} onClose={() => setModalOpen(false)} />}
                    </AnimatePresence>
                </portals.InPortal>
            }
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

const TipsterModalVariants = {
    open: {
        opacity: [0, 1],
        transition: {
            duration: 0.3,
            ease: 'easeInOut'
        }
    },
    closed: {
        opacity: [1, 0],
        transition: {
            duration: 0.3,
            ease: 'easeInOut'
        }
    }
}

interface TipsterModalProps extends inferArrayElementType<Tipsters> {
    onClose: () => void
}

const plans = [
    { name: 'Monthly', multiplier: 1, id: 1 },
    { name: '6/mo', multiplier: 6, id: 2 },
    { name: '12/mo', multiplier: 12, id: 3 }
]

const TipsterModal: React.FC<TipsterModalProps> = (props) => {
    const { image, name, subscriptionCost, onClose } = props
    const [selectedPlan, setSelectedPlan] = useState(1)

    return (
        <div className={styles.modalContainer}>
            <motion.div
                className={styles.backdrop}
                onClick={onClose}
                variants={TipsterModalVariants}
                initial="closed"
                animate="open"
                exit="closed"
            />
            <motion.div
                className={styles.modal}
                variants={TipsterModalVariants}
                initial="closed"
                animate="open"
                exit="closed"
            >
                <div className={styles.header}>
                    <Image
                        src={image}
                        height={70}
                        width={70}
                    />
                    <div>
                        <span>Subscribe to</span>
                        <span className={styles.name}>{name}</span>
                    </div>
                    <div
                        className={styles.close}
                        onClick={onClose}
                    >
                        <Image
                            src='/icons/close.svg'
                            height={24}
                            width={24}
                        />
                    </div>
                </div>
                <div className={styles.plans}>
                    <span>Plans</span>
                    <div className={styles.plansList}>
                        {plans.map(({ name, multiplier, id }) => (
                            <div
                                className={`${styles.plan} ${selectedPlan === id && styles.active}`}
                                onClick={() => setSelectedPlan(id)}
                            >
                                <span className={styles.name}>
                                    {name}
                                </span>
                                <span className={styles.cost}>
                                    $ {subscriptionCost * multiplier}
                                </span>
                                <span className={styles.duration}>
                                    Per {multiplier > 1 && multiplier} month{multiplier > 1 && 's'}
                                </span>
                                <span className={styles.description}>
                                    Subscription will run from now to{' '}
                                    <Moment
                                        format='D MMMM YYYY'
                                        date={new Date(
                                            new Date().getFullYear(),
                                            new Date().getMonth() + multiplier,
                                            new Date().getDate()
                                        )}
                                    />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.paymentMethods}>
                    <span>Payment methods</span>
                    <button>
                        <Image
                            src="/images/paypal.svg"
                            height={20}
                            width={80}
                        />
                    </button>
                    <button>
                        <Image
                            src="/images/visa.svg"
                            height={14}
                            width={48}
                        />
                        <Image
                            src="/images/mastercard.svg"
                            height={20}
                            width={32}
                        />
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default TipsterRating;
