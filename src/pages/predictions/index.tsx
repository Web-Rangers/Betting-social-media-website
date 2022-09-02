import React, { useState } from 'react'
import { NextPage } from 'next'
import styles from '@styles/pages/Predictions.module.css'
import { trpc } from 'src/utils/trpc'
import { MostTips, Sports } from 'src/types/queryTypes'
import Slider from '@components/ui/Slider'
import MatchTipsCard from '@components/ui/MatchTipsCard'
import Image from 'next/image'
import BestBookmakers from '@components/ui/BestBookmakers'
import Banner from '@components/ui/Banner'
import Filter from '@components/ui/Filter'
import Predictions from '@components/ui/Predictions'
import TextField from '@components/ui/TextField'
import DatePicker from '@components/ui/DatePicker'

const SortItems = [
    {
        name: 'Upcoming',
        id: '1'
    },
    {
        name: 'Most',
        id: '2'
    },
    {
        name: 'Multiple',
        id: '3'
    },
]

const TypeItems = [
    {
        name: 'All',
        id: '1'
    },
    {
        name: 'Free',
        id: '2'
    },
    {
        name: 'Paid',
        id: '3'
    },
]

const PredictionsPage: NextPage = () => {
    const { data: tips, isLoading: tipsLoading } = trpc.useQuery(['tips.getAll'])
    const { data: predictions, isLoading: predictionsLoading } = trpc.useQuery(['predictions.getAll'])
    const { data: bookmakers, isLoading: bookmakersLoading } = trpc.useQuery(['bookmakers.getAll'])
    const { data: leagues, isLoading: leaguesLoading } = trpc.useQuery(['filters.getLeagues'])
    const { data: sports, isLoading: sportsLoading } = trpc.useQuery(['filters.getSports'])

    if (tipsLoading || predictionsLoading || bookmakersLoading || leaguesLoading || sportsLoading) {
        return <div>Loading...</div>
    }

    if (!tips || !predictions || !bookmakers || !leagues || !sports) {
        return <div>Error...</div>
    }

    return (
        <>
            <div className={styles.mainBlock}>
                <TipsSlider tips={tips} />
            </div>
            <div className={styles.mainColumn}>
                <div className={styles.filters}>
                    <h4>Filter</h4>
                    <div className={styles.search}>
                        <TextField
                            placeholder='Search'
                            icon='/icons/search.svg'
                        />
                        <button>
                            Reset
                        </button>
                    </div>
                    <h5>SORT BY</h5>
                    <SortButtons
                        items={SortItems}
                        onChange={() => { }}
                    />
                    <h5>Date</h5>
                    <DatePicker onChange={() => { }} />
                    <h5>Type</h5>
                    <SortButtons
                        items={TypeItems}
                        onChange={() => { }}
                    />
                    <Filter
                        items={leagues}
                        h3="CHOOSE LEAGUE"
                        onChange={() => { }}
                    />
                </div>
                <div className={styles.predictions}>
                    <SportsSider sports={sports} onChange={() => { }} />
                    <Predictions leagues={predictions} />
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
                    loop={true}
                    autoPlay={true}
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

const SportsSider: React.FC<{ sports: Sports, onChange: (ids: string[]) => void }> = (props) => {
    const { sports, onChange } = props
    const _sports = sliceIntoChunks(sports, 5);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    function sliceIntoChunks(arr: Sports, chunkSize: number) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    function handleSelect(id: string) {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
            onChange(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems([...selectedItems, id])
            onChange([...selectedItems, id])
        }
    }

    return (
        <div className={styles.sportsSlider}>
            <h4>Sport</h4>
            <Slider
                showPagination={false}
                showArrows={true}
                arrowOptions={{
                    offset: {
                        next: {
                            top: 0,
                            side: 0,
                        },
                        prev: {
                            top: 0,
                            side: 'calc(100% - 50px)'
                        }
                    },
                    size: {
                        height: 30,
                        width: 30
                    },
                    backgroundColor: 'transparent',
                    arrowColor: 'dark'
                }}
            >
                {_sports.map((sportsChunk, slideIndex) => (
                    <div className={styles.slide} key={`sports_slide_${slideIndex}`}>
                        {sportsChunk.map(({ name, image, id }, index) => (
                            <div
                                className={`${styles.sport} ${selectedItems.includes(id) && styles.active}`}
                                key={`sports_slide_${slideIndex}_item_${index}`}
                                onClick={() => handleSelect(id)}
                            >
                                <div className={styles.image}>
                                    <Image
                                        src={image}
                                        alt={name}
                                        height={24}
                                        width={24}
                                    />
                                </div>
                                <span className={styles.name}>{name}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </Slider>
        </div>
    )
}

interface SortButtonsProps {
    items: {
        name: string,
        id: string
    }[],
    onChange: (ids: string[]) => void
}

const SortButtons: React.FC<SortButtonsProps> = (props) => {
    const { items, onChange } = props
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    function handleSelect(id: string) {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
            onChange(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems([...selectedItems, id])
            onChange([...selectedItems, id])
        }
    }

    return (
        <div className={styles.filterButtons}>
            {items.map(({ id, name }) => (
                <button
                    key={`sort_button_${id}_${name}`}
                    onClick={() => handleSelect(id)}
                    className={selectedItems.includes(id) ? styles.active : undefined}
                >
                    {name}
                </button>
            ))}
        </div>
    )
}

export default PredictionsPage