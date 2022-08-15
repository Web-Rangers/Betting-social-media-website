import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import styles from '@styles/pages/Home.module.css';
import Slider from "@components/ui/Slider";
import Image from "next/image";
import { useSession } from "next-auth/react";

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

const Home: NextPage = () => {
    const { data: session } = useSession()

    return (
        <>
            <div className={styles.mainColumn}>
                <div className={styles.slider}>
                    <Slider>
                        {
                            [1, 2, 3, 4, 5].map(i => (
                                <Slide />
                            ))
                        }
                    </Slider>
                </div>
            </div>
            <div className={styles.sideColumn}>
                {!session && <SignUpPropose />}
                <TopTipsters tipsters={TipstersTemp} />
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
                    {tipsters.slice(0, 3).map(tipster => (
                        <div className={styles.topTipster}>
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
                        <div className={styles.topOther}>
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

export default Home;
