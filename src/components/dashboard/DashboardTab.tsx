import Image from "next/future/image";
import Link from "next/link";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import React, { ReactNode, useMemo, useState } from "react";
import { trpc } from "src/utils/trpc";
import styles from "@styles/components/dashboard/DashboardTab.module.css";
import sharedStyles from "@styles/components/dashboard/shared.module.css";

const DashboardTab: React.FC = () => {
	const { data, isLoading } = trpc.useQuery(["user.getDashboardInfo"]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data) {
		return <div>Error...</div>;
	}

	return (
		<div className={styles.dashboardTab}>
			<div className={sharedStyles.row}>
				<div
					id={styles.profit}
					className={`${sharedStyles.block} ${sharedStyles.narrow} ${
						data.avgProfit > 0
							? sharedStyles.positive
							: sharedStyles.negative
					}`}
				>
					<div className={sharedStyles.image}>
						<Image
							src="/images/dashboard/wallet.svg"
							height={60}
							width={60}
							alt=""
						/>
					</div>
					<div className={styles.text}>
						<h5>Avg. Monthly Profit</h5>
						<span>$ {data.avgProfit}</span>
					</div>
				</div>
				<div
					id={styles.stats}
					className={`${sharedStyles.block} ${sharedStyles.wide}`}
				>
					<div className={styles.stat}>
						<h3>ROI</h3>
						<span>{data.roi * 100}%</span>
					</div>
					<div className={styles.stat}>
						<h3>Tips Per Month</h3>
						<span>{data.tips_per_month}</span>
					</div>
					<div className={styles.stat}>
						<h3>Hit rate</h3>
						<span>{data.winrate * 100}%</span>
					</div>
				</div>
			</div>
			<div className={sharedStyles.row}>
				<div
					id={styles.coins}
					className={`${sharedStyles.block} ${sharedStyles.wide}`}
				>
					<div className={styles.info}>
						<div className={sharedStyles.image}>
							<Image
								src="/images/dashboard/piggy-bank.svg"
								height={60}
								width={60}
								alt=""
							/>
						</div>
						<div className={styles.count}>
							<h4>Coins</h4>
							<span>{data.coins.count}</span>
						</div>
					</div>
					<div className={styles.description}>
						<span>
							If you want to know more about the local currency
							and how to get it, visit the “About Coin” page
						</span>
						<Link href="/about-coins">
							<a>View more about coin</a>
						</Link>
					</div>
				</div>
				<div
					id={styles.bookmaker}
					className={`${sharedStyles.block} ${sharedStyles.narrow}`}
				>
					<h5>Favorite Bookmaker</h5>
					<Image
						src={data.favoriteBookmaker.image}
						height={50}
						width={140}
						alt=""
					/>
				</div>
			</div>
			<div className={sharedStyles.row}>
				<div
					id={styles.sport}
					className={`${sharedStyles.block} ${sharedStyles.small}`}
				>
					<Image
						src={data.favoriteSport.image}
						height={60}
						width={60}
						alt=""
					/>
					<div className={styles.info}>
						<h5>Favorite Sport</h5>
						<h2>{data.favoriteSport.name}</h2>
					</div>
				</div>
				<div
					id={styles.odds}
					className={`${sharedStyles.block} ${sharedStyles.narrow}`}
				>
					<div className={styles.info}>
						<div className={sharedStyles.image}>
							<Image
								src="/images/dashboard/chart-bubble.svg"
								height={60}
								width={60}
								alt=""
							/>
						</div>
						<div className={styles.text}>
							<h5>Average Odds</h5>
							<span>{data.odds.avg}</span>
						</div>
					</div>
					<StatisticsChart data={data.odds.history} />
				</div>
				<div
					id={styles.unit}
					className={`${sharedStyles.block} ${sharedStyles.narrow}`}
				>
					<div className={styles.info}>
						<h5>All Time Average Unit Rate</h5>
						<div className={styles.detailed}>
							<div className={sharedStyles.image}>
								<Image
									src="/images/dashboard/coin.svg"
									height={60}
									width={60}
									alt=""
								/>
							</div>
							<div className={styles.text}>
								<h4>Coins</h4>
								<span>{data.coins.count}</span>
							</div>
						</div>
					</div>
					<StatisticsChart data={data.coins.history} />
				</div>
			</div>
			<div className={sharedStyles.row}>
				<div
					id={styles.bets}
					className={`${sharedStyles.block} ${sharedStyles.wide}`}
				>
					<div className={`${styles.progressBar} ${styles.won}`}>
						<CircularProgressbarWithChildren
							value={(data.bets.won / data.bets.total) * 360}
							maxValue={360}
							styles={{
								path: {
									strokeLinecap: "round",
									strokeWidth: "2px",
									stroke: "#7F3FFC",
								},
							}}
						>
							<h3>Won</h3>
							<span>{data.bets.won}</span>
						</CircularProgressbarWithChildren>
					</div>
					<div className={`${styles.progressBar} ${styles.pending}`}>
						<CircularProgressbarWithChildren
							value={(data.bets.pending / data.bets.total) * 360}
							maxValue={360}
							styles={{
								path: {
									strokeLinecap: "round",
									strokeWidth: "2px",
									stroke: "#FFB82D",
								},
								root: {
									transform: `rotate(${
										360 -
										(data.bets.won / data.bets.total) * 360
									}deg)`,
								},
							}}
						>
							<h3>Pending</h3>
							<span>{data.bets.pending}</span>
						</CircularProgressbarWithChildren>
					</div>
					<div className={`${styles.progressBar} ${styles.lost}`}>
						<CircularProgressbarWithChildren
							value={(data.bets.lost / data.bets.total) * 360}
							maxValue={360}
							styles={{
								path: {
									strokeLinecap: "round",
									strokeWidth: "2px",
									stroke: "#FF5018",
								},
								root: {
									transform: `rotate(${
										360 -
										(data.bets.lost / data.bets.total) * 360
									}deg)`,
								},
							}}
						>
							<h3>Lost</h3>
							<span>{data.bets.lost}</span>
						</CircularProgressbarWithChildren>
					</div>
				</div>
				<div
					className={`${sharedStyles.block} ${sharedStyles.narrow} ${sharedStyles.hidden}`}
				/>
			</div>
		</div>
	);
};

const StatisticsChart: React.FC<{ data: { time: number; value: number }[] }> = (
	props
) => {
	const { data } = props;

	return (
		<ResponsiveContainer
			height={100}
			width="100%"
		>
			<LineChart data={data}>
				<Line
					type="linear"
					dataKey="value"
					stroke="#7F3FFC"
					strokeWidth={2}
					dot={false}
					strokeLinecap="round"
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default DashboardTab;
