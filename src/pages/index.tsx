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

const TipstersTemp = [
    { name: "John Doe", image: "/images/profile-placeholder.png", winrate: 0.5 },
    { name: "Jane Doe", image: "/images/profile-placeholder.png", winrate: 0.3 },
    { name: "Jack Doe", image: "/images/profile-placeholder.png", winrate: 0.2 },
    { name: "Jill Doe", image: "/images/profile-placeholder.png", winrate: 0.1 },
    { name: "Joe Doe", image: "/images/profile-placeholder.png", winrate: 0.9 },
    { name: "Juan Doe", image: "/images/profile-placeholder.png", winrate: 0.8 },
    { name: "Julie Doe", image: "/images/profile-placeholder.png", winrate: 0.7 },
    { name: "Jenny Doe", image: "/images/profile-placeholder.png", winrate: 0.6 },
]

const MostTipsTemp = [
    {
        league: "Premier League",
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg" },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg" },
        ],
        tipAmount: 21,
        date: "23:20 2020.01.01",
        status: 'upcoming'
    },
    {
        league: "Premier League",
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg" },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg" },
        ],
        tipAmount: 21,
        date: "2020-01-01",
        status: 'live',
        duration: '48:32'
    },
    {
        league: "Premier League",
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg" },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg" },
        ],
        tipAmount: 21,
        date: "2020-01-01",
        status: 'finished',
        duration: '17:32'
    }
]

const BookmakersTemp = [
    { name: "Bet365", image: "/images/bookmaker-placeholder-1.png", rating: 4.5, color: '#26292E' },
    { name: "Bwin", image: "/images/bookmaker-placeholder-2.png", rating: 4.0, color: '#FF6300' },
    { name: "Betway", image: "/images/bookmaker-placeholder-3.png", rating: 3.5, color: '#193052' },
]

const LiveMatchesTemp = [
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
        ],
        id: 1,
        duration: '48:32',
    },
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 0 },
        ],
        id: 2,
        duration: '48:32',
    },
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 0 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
        ],
        id: 3,
        duration: '48:32',
    },
]

const FiltersTemp = [
    { name: "Premier League", subName: "England", count: 100, image: "/images/team-1-placeholder.svg", id: "1" },
    { name: "La Liga", subName: "Spain", count: 100, image: "/images/team-2-placeholder.svg", id: "2" },
    { name: "Bundesliga", subName: "Germany", count: 100, image: "/images/team-1-placeholder.svg", id: "3" },
    { name: "Serie A", subName: "Italy", count: 100, image: "/images/team-2-placeholder.svg", id: "4" },
    { name: "Ligue 1", subName: "France", count: 100, image: "/images/team-1-placeholder.svg", id: "5" },
    { name: "Eredivisie", subName: "Netherlands", count: 100, image: "/images/team-2-placeholder.svg", id: "6" },
    { name: "Primera Division", subName: "Spain", count: 100, image: "/images/team-1-placeholder.svg", id: "7" },
    { name: "Super League", subName: "Russia", count: 100, image: "/images/team-2-placeholder.svg", id: "8" },
    { name: "UEFA Champions League", subName: "England", count: 100, image: "/images/team-1-placeholder.svg", id: "9" },
    { name: "UEFA Europa League", subName: "England", count: 100, image: "/images/team-2-placeholder.svg", id: "10" },
]

const PredictionsTemp = [
    {
        time: "23:20",
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg" },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg" },
        ],
        predictions: [
            {
                time: "23:20",
                user: {
                    name: "John Doe",
                    image: "/images/profile-placeholder.png",
                    winrate: 0.5
                },
                comment: false,
                outcome: 'Liverpool win'
            },
            {
                time: "23:20",
                user: {
                    name: "Jane Doe",
                    image: "/images/profile-placeholder.png",
                    winrate: 0.3
                },
                comment: true,
                outcome: 'Manchester win'
            }
        ]
    },
    {
        time: "23:20",
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg" },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg" },
        ],
        predictions: [
            {
                time: "23:20",
                user: {
                    name: "John Doe",
                    image: "/images/profile-placeholder.png",
                    winrate: 0.5
                },
                comment: false,
                outcome: 'Liverpool win'
            },
        ]
    },
    {
        time: "23:20",
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg" },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg" },
        ],
        predictions: [
            {
                time: "23:20",
                user: {
                    name: "John Doe",
                    image: "/images/profile-placeholder.png",
                    winrate: 0.5
                },
                comment: false,
                outcome: 'Liverpool win'
            },
            {
                time: "23:20",
                user: {
                    name: "Jane Doe",
                    image: "/images/profile-placeholder.png",
                    winrate: 0.3
                },
                comment: true,
                outcome: 'Manchester win'
            }
        ]
    },
]

const Home: NextPage = () => {
    const { data: session } = useSession()

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
                    <MostTips tips={MostTipsTemp} />
                    <Banner height={200} image="/images/banner-placeholder-1.png" />
                    <div className={styles.matchesContainer}>
                        <div className={styles.matchesFilters}>
                            <Filter
                                h3="Top Leagues"
                                h2="Football Leagues"
                                items={FiltersTemp}
                                onChange={(id) => { }}
                            />
                            <Filter
                                h3="Leagues"
                                items={FiltersTemp}
                                onChange={(id) => { }}
                            />
                        </div>
                        <div className={styles.matches}>
                            <Predictions
                                matches={PredictionsTemp}
                                h2="Best Predictions"
                                h3="Today"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.sideColumn}>
                {!session && <SignUpPropose />}
                <TopTipsters tipsters={TipstersTemp} />
                <LiveMatches matches={LiveMatchesTemp} />
                <Banner height={463} image="/images/banner-placeholder-2.png" />
                <BestBookmakers bookmakers={BookmakersTemp} />
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

interface TopTipstersProps {
    tipsters: { name: string, winrate: number, image: string }[];
}

const TopTipsters: React.FC<TopTipstersProps> = (props) => {
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

interface MostTipsProps {
    tips: {
        league: string,
        teams: { image: string, name: string }[],
        tipAmount: number,
        date?: string,
        status?: string,
        duration?: string
    }[];
}

const MostTips: React.FC<MostTipsProps> = (props) => {
    const { tips } = props;

    function getStatusComponent(tip: typeof tips[0]) {
        switch (tip.status) {
            case 'finished':
                return <span className={styles.mostTipsFinished}>{tip.duration}s</span>;
            case 'live':
                return <span className={styles.mostTipsLive}>Live: {tip.duration}</span>;
            case 'upcoming':
                return <span className={styles.mostTipsUpcoming}>{tip.date}</span>;
        }
    }

    return (
        <div className={styles.mostTips}>
            <h2>Most Tips</h2>
            <div className={styles.mostTipsList}>
                {tips.map((tip, index) => (
                    <div className={styles.mostTipsItem} key={`tip_${index}`}>
                        <div className={styles.mostTipsRow}>
                            <div className={styles.mostTipsTeams}>
                                {tip.teams.map((team, index) => (
                                    <div
                                        className={styles.mostTipsTeam}
                                        key={`team_image_${index}`}
                                    >
                                        <Image
                                            src={team.image}
                                            alt={team.name}
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                ))}
                            </div>
                            {tip.status && (getStatusComponent(tip))}
                        </div>
                        <div className={styles.mostTipsRow}>
                            <div className={styles.mostTipsInfo}>
                                <span className={styles.mostTipsLeague}>{tip.league}</span>
                                <div className={styles.mostTipsTeamNames}>
                                    {tip.teams.map((team, index) => (
                                        <span
                                            className={styles.mostTipsTeamName}
                                            key={`team_name_${index}`}
                                        >
                                            {team.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.mostTipsTipAmount}>
                                {tip.tipAmount} Tips
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;
