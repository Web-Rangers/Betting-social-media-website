import React from 'react'
import { NextPage } from 'next'
import styles from '@styles/pages/Predictions.module.css'
import { trpc } from 'src/utils/trpc'
import { MostTips } from 'src/types/queryTypes'
import Slider from '@components/ui/Slider'
import MatchTipsCard from '@components/ui/MatchTipsCard'
import Image from 'next/image'
import BestBookmakers from '@components/ui/BestBookmakers'
import Banner from '@components/ui/Banner'
import Filter from '@components/ui/Filter'
import Predictions from '@components/ui/Predictions'

const PredictionsPage: NextPage = () => {
    const { data: tips, isLoading: tipsLoading } = trpc.useQuery(['tips.getAll'])
    const { data: predictions, isLoading: predictionsLoading } = trpc.useQuery(['predictions.getAll'])
    const { data: bookmakers, isLoading: bookmakersLoading } = trpc.useQuery(['bookmakers.getAll'])
    const { data: filters, isLoading: filtersLoading } = trpc.useQuery(['filters.getAll'])

    if (tipsLoading || predictionsLoading || bookmakersLoading || filtersLoading) {
        return <div>Loading...</div>
    }

    if (!tips || !predictions || !bookmakers || !filters) {
        return <div>Error...</div>
    }

    return (
        <>
            <div className={styles.mainBlock}>
                <TipsSlider tips={tips} />
            </div>
            <div className={styles.mainColumn}>
                <div className={styles.filters}>
                    <Filter
                        items={filters}
                        h3="CHOOSE LEAGUE"
                        onChange={() => { }}
                    />
                </div>
                <div className={styles.predictions}>
                    <Predictions matches={predictions} />
                </div>
            </div>
            <div className={styles.sideColumn}>
                <BestBookmakers bookmakers={bookmakers} />
                <Banner height={463} image='/images/banner-placeholder-2.png' />
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
                    arrowOptions={{
                        offset: {
                            next: {
                                top: -48,
                                side: 100,
                            },
                            prev: {
                                top: -48,
                                side: 'calc(100% - 170px)'
                            }
                        },
                        size: {
                            height: 30,
                            width: 30
                        },
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

export default PredictionsPage