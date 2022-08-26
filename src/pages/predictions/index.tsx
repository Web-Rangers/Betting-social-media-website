import React from 'react'
import { NextPage } from 'next'
import styles from '@styles/pages/Predictions.module.css'
import { trpc } from 'src/utils/trpc'
import { MostTips } from 'src/types/queryTypes'
import Slider from '@components/ui/Slider'
import MatchTipsCard from '@components/ui/MatchTipsCard'
import Image from 'next/image'

const Predictions: NextPage = () => {
    const { data: tips, isLoading: tipsLoading } = trpc.useQuery(['tips.getAll'])
    const { data: predictions, isLoading: predictionsLoading } = trpc.useQuery(['predictions.getAll'])

    if (tipsLoading || predictionsLoading) {
        return <div>Loading...</div>
    }

    if (!tips || !predictions) {
        return <div>Error...</div>
    }

    return (
        <>
            <div className={styles.mainBlock}>
                <TipsSlider tips={tips} />
            </div>
        </>
    )
}

const TipsSlider: React.FC<{ tips: MostTips }> = (props) => {
    const { tips } = props
    const _tips = sliceIntoChunks(tips, 4);

    function sliceIntoChunks(arr: MostTips, chunkSize: number) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }


    return (
        <div className={styles.tipsSlider}>
            <div className={styles.background}>
                <Image
                    src='/images/stadium-background.png'
                    layout='fill'
                    objectFit='cover'
                />
            </div>
            <h2>Most Popular</h2>
            <div className={styles.sliderContainer}>
                <Slider
                    showArrows={true}
                    arrowOffset={{
                        next: {
                            top: -55,
                            side: 100,
                        },
                        prev: {
                            top: -55,
                            side: 'calc(100% - 200px)'
                        }
                    }}
                >
                    {_tips.map((tipsChunk, index) => (
                        <div className={styles.slide} key={`slide_${index}`}>
                            {tipsChunk.map((tip, index) => (
                                <MatchTipsCard {...tip} key={`tip_${index}`} />
                            ))}
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default Predictions