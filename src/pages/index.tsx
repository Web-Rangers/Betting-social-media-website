import Banner from "@components/ui/Banner";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import styles from '@styles/pages/Home.module.css';
import Slider from "@components/ui/Slider";
import Image from "next/image";
import { useSession } from "next-auth/react";
import BestBookmakers from "@components/ui/BestBookmakers";
import LiveMatches from "@components/ui/LiveMatches";
import Filter from "@components/ui/Filter";
import Predictions from "@components/ui/Predictions";
import { MatchStatus } from "src/types/matchStatus";
import { MostTips, Tipsters } from "src/types/queryTypes";
import MatchTipsCard from "@components/ui/MatchTipsCard";

const Home: NextPage = () => {
    const { data: session } = useSession()
    const { data: bookmakers, isLoading: bookmakersLoading } = trpc.useQuery(['bookmakers.getAll'])
    const { data: filters, isLoading: filtersLoading } = trpc.useQuery(['filters.getAll'])
    const { data: predictions, isLoading: predictionsLoading } = trpc.useQuery(['predictions.getAll'])
    const { data: matches, isLoading: matchesLoading } = trpc.useQuery(['matches.getAllLive'])
    const { data: tips, isLoading: tipsLoading } = trpc.useQuery(['tips.getAll'])
    const { data: tipsters, isLoading: tipstersLoading } = trpc.useQuery(['tipsters.getAll'])

    if (bookmakersLoading || filtersLoading || predictionsLoading || matchesLoading || tipsLoading || tipstersLoading) {
        return <div>Loading...</div>
    }

    if (!bookmakers || !filters || !predictions || !matches || !tips || !tipsters) {
        return <div>Error</div>
    }

    return (
        <>
            <div className={styles.mainColumn}>
                <div className={styles.slider}>
                    <Slider>
                        {
                            [1, 2, 3, 4, 5].map(i => (
                                <Slide key={`slide_${i}`} />
                            ))
                        }
                    </Slider>
                </div>
                <div className={styles.paddedContainer}>
                    <MostTips tips={tips} />
                    <Banner height={200} image="/images/banner-placeholder-1.png" />
                    <div className={styles.matchesContainer}>
                        <div className={styles.matchesFilters}>
                            <Filter
                                h3="Top Leagues"
                                h2="Football Leagues"
                                items={filters}
                                onChange={(id) => { }}
                            />
                            <Filter
                                h3="Leagues"
                                items={filters}
                                onChange={(id) => { }}
                            />
                        </div>
                        <div className={styles.matches}>
                            <Predictions
                                matches={predictions}
                                h2="Best Predictions"
                                h3="Today"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.sideColumn}>
                {!session && <SignUpPropose />}
                <TopTipsters tipsters={tipsters} />
                <LiveMatches matches={matches} />
                <Banner height={463} image="/images/banner-placeholder-2.png" />
                <BestBookmakers bookmakers={bookmakers} />
            </div>
        </>
    );
};

const Slide: React.FC = () => {
    return (
        <div className={styles.slide}>
            <div className={styles.slideBackground}>
                <Image
                    src="/images/slide-background-placeholder.png"
                    alt="slide-background"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className={styles.slideTimer}>
                <div className={styles.timerElement}>
                    <span className={styles.timerElementValue}>13 </span>
                    <span className={styles.timerElementLabel}>day</span>
                </div>
                :
                <div className={styles.timerElement}>
                    <span className={styles.timerElementValue}>13</span>
                    <span className={styles.timerElementLabel}>hr</span>
                </div>
                :
                <div className={styles.timerElement}>
                    <span className={styles.timerElementValue}>13</span>
                    <span className={styles.timerElementLabel}>min</span>
                </div>
                :
                <div className={styles.timerElement}>
                    <span className={styles.timerElementValue}>13</span>
                    <span className={styles.timerElementLabel}>sec</span>
                </div>
            </div>
            <div className={styles.slideSummary}>
                <div className={styles.slideSummaryTitle}>
                    <span className={styles.slideSummaryTitleCountry}>Germany</span>
                    <span className={styles.slideSummaryTitleLeague}>Bunes League</span>
                </div>
                <div className={styles.slideSummaryTeams}>
                    <div className={styles.slideSummaryTeam}>
                        <span className={styles.slideSummaryTeamName}>Eintracht Frankfurt</span>
                        <div className={styles.slideSummaryTeamImage}>
                            <Image
                                src="/images/team-1-placeholder.svg"
                                alt="Eintracht Frankfurt"
                                width={36}
                                height={36}
                            />
                        </div>
                    </div>
                    VS
                    <div className={styles.slideSummaryTeam}>
                        <div className={styles.slideSummaryTeamImage}>
                            <Image
                                src="/images/team-2-placeholder.svg"
                                alt="Bayern Munich"
                                width={36}
                                height={36}
                            />
                        </div>
                        <span className={styles.slideSummaryTeamName}>Bayern Munich</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SignUpPropose: React.FC = () => {
    return (
        <div className={styles.signUpPropose}>
            <h2>
                Join with us!
            </h2>
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book.
            </span>
            <button>Sign Up</button>
        </div>
    )
}

const TopTipsters: React.FC<{ tipsters: Tipsters }> = (props) => {
    const { tipsters } = props;

    return (
        <div className={styles.topTipsters}>
            <h2 className={styles.topTipstersTitle}>Top Tipsters</h2>
            <div className={styles.topTipstersList}>
                <div className={styles.topThreeTipsters}>
                    {tipsters.slice(0, 3).map((tipster, index) => (
                        <div className={styles.topTipster} key={`tipster_${index}`}>
                            <div className={styles.topTipsterImage}>
                                <Image
                                    src={tipster.image}
                                    alt={tipster.name}
                                    width={70}
                                    height={70}
                                />
                            </div>
                            <span className={styles.topTipsterName}>
                                {tipster.name}
                            </span>
                            <div className={styles.topTipsterWinrate}>
                                <span className={styles.winrateLabel}>Winrate</span>
                                <span className={styles.winratePercent}>{tipster.winrate * 100}%</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.topTipstersOther}>
                    {tipsters.slice(3, 8).map((tipster, index) => (
                        <div className={styles.topOther} key={`tipster_${index + 4}`}>
                            <div className={styles.otherContent}>
                                <div className={styles.otherIndex}> {index + 4} </div>
                                <div className={styles.otherInfo}>
                                    <div className={styles.topOtherImage}>
                                        <Image
                                            src={tipster.image}
                                            alt={tipster.name}
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                    <span className={styles.topTipsterName}> {tipster.name} </span>
                                </div>
                            </div>
                            <div className={styles.topOtherWinrate}>
                                Winrate {tipster.winrate * 100}%
                            </div>
                        </div>
                    ))}
                    <a className={styles.topTipstersMore}>
                        See All
                    </a>
                </div>
            </div>
        </div>
    )
}

const MostTips: React.FC<{ tips: MostTips }> = (props) => {
    const { tips } = props;

    return (
        <div className={styles.mostTips}>
            <h2>Most Tips</h2>
            <div className={styles.mostTipsList}>
                {tips.map((tip, index) => (
                    <MatchTipsCard {...tip} key={`tip_${index}`} />
                ))}
            </div>
        </div>
    )
}

export default Home;
