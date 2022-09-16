import React from "react";
import styles from "@styles/components/ui/LiveMatches.module.css";
import Image from "next/future/image";
import { LiveMatches } from "src/types/queryTypes";

const LiveMatches: React.FC<{ matches: LiveMatches }> = (props) => {
	const { matches } = props;

	return (
		<div className={styles.liveMatches}>
			<div className={styles.liveMatchesTitle}>
				<div className={styles.liveMatchesTitleText}>
					<h3>Watch now</h3>
					<h2>Live Matches</h2>
				</div>
				<button>See All</button>
			</div>
			<div className={styles.liveMatchesList}>
				{matches.map((match, index) => (
					<div
						className={styles.liveMatchesItem}
						key={`match_${match.id}`}
					>
						<div className={styles.matchInfo}>
							<div className={styles.matchInfoHeader}>
								{/* <div className={styles.matchDuration}>
									Live: {match.duration}
								</div> */}
								<div className={styles.buttonContainer}>
									{/* <button>
										<Image
											src="/icons/viewers.svg"
											width={20}
											height={20}
											alt="expand"
										/>
										{match.viewer_count}
									</button> */}
									<button>
										<Image
											src="/icons/expand.svg"
											width={20}
											height={20}
											alt="expand"
										/>
									</button>
								</div>
							</div>
							<div className={styles.matchLive}>
								<Image
									src="/images/live-match-placeholder.png"
									width={340}
									height={99}
									alt=""
								/>
							</div>
						</div>
						<div className={styles.matchTeams}>
							<div
								className={styles.matchTeam}
								key={`team_1_${index}`}
							>
								<div className={styles.matchTeamName}>{match.home.name}</div>
								{/* <div className={styles.matchTeamScore}>{match.home.score}</div> */}
							</div>
							<div
								className={styles.matchTeam}
								key={`team_2_${index}`}
							>
								<div className={styles.matchTeamName}>{match.away.name}</div>
								{/* <div className={styles.matchTeamScore}>{match.away.score}</div> */}
							</div>
							{/* <div
								className={`${styles.matchDuration} ${styles.absolute}`}
							>
								{match.duration}
							</div> */}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LiveMatches;
