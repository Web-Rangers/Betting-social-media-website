import React, { useState } from 'react'
import styles from "@styles/pages/TipsterRating.module.css"
import { inferQueryOutput, trpc } from 'src/utils/trpc'
import Image from 'next/image';
import Slider from '@components/ui/Slider';
import type { Tipsters } from 'src/types/queryTypes';
import { inferArrayElementType } from 'src/utils/inferArrayElementType';

const TipsterRating: React.FC = () => {
    const { data: tipsters, isLoading: tipstersLoading } = trpc.useQuery(['tipsters.getAll']);

    if (tipstersLoading) {
        return <div>Loading...</div>
    }

    if (!tipsters) {
        return <div>Error...</div>
    }

    return (
        <>
            <div className={styles.mainBlock}>
                <VerifiedTipsters tipsters={tipsters} />
            </div>
        </>
    )
}

const VerifiedTipsters: React.FC<{ tipsters: Tipsters }> = (props) => {
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
    const { avgProfit, image, name, subscribtionCost, winrate, sport } = props
    const [following, setFollowing] = useState(false);

    return (
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
                    <h4>$ {subscribtionCost}/MO</h4>
                    <span>How to subscribe?</span>
                </div>
                <button>
                    Subscribe
                </button>
            </div>
        </div>
    )
}

const TipsterModal: React.FC<inferArrayElementType<Tipsters>> = (props) => {
    const { image, name, subscribtionCost } = props


    return (
        <div>

        </div>
    )
}

export default TipsterRating;
