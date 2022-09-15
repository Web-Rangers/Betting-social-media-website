import { GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
import { trpc } from "src/utils/trpc";
import styles from "@styles/pages/TipsterCompetition.module.css";
import Image from "next/future/image";
import { CurrentCompetition, PreviousCompetitions, Tipsters } from "src/types/queryTypes";
import Moment from "react-moment";
import { PortalContext } from "src/utils/portalContext";
import TextField from "@components/ui/TextField";
import Dropdown from "@components/ui/Dropdown";
import { AnimatePresence, motion } from "framer-motion";
import Slider from "@components/ui/Slider";
import shortenNumber from "src/utils/shortenNumber";
import TipsterModal from "@components/ui/TipsterModal";
import usePortal from "src/utils/usePortal";
import Table from "@components/ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import dynamic from "next/dynamic";
import { createSSGHelpers } from "@trpc/react/ssg";
import { appRouter } from "src/server/router";
import { createContext } from "src/server/router/context";
import superjson from "superjson";

const InPortal = dynamic(async () => (await import("react-reverse-portal")).InPortal, { ssr: false });
const OutPortal = dynamic(async () => (await import("react-reverse-portal")).OutPortal, { ssr: false });

const TableDropdownItems = [
	{
		name: "1-10 Months",
		id: "1",
	},
	{
		name: "1-5 Months",
		id: "2",
	},
	{
		name: "1-2 Months",
		id: "3",
	},
	{
		name: "1 Month",
		id: "4",
	},
];

const CompetitionDropdownItems = [
	{
		name: "Today",
		id: "1",
	},
	{
		name: "This week",
		id: "2",
	},
	{
		name: "This month",
		id: "3",
	},
	{
		name: "This year",
		id: "4",
	},
];

const CompetitionSportItems = [
	{
		name: "Football",
		id: "1",
	},
	{
		name: "Baseball",
		id: "2",
	},
	{
		name: "Basketball",
		id: "3",
	},
	{
		name: "Box",
		id: "4",
	},
];

const columnHelper = createColumnHelper<inferArrayElementType<Tipsters>>();

const columns = [
	columnHelper.display({
		id: "index",
		header: "#",
		cell: (props) =>
			props.row.index === 0 ? (
				<div>
					<Image
						src="/icons/crown-violet.svg"
						height={24}
						width={24}
						alt=""
					/>
				</div>
			) : (
				props.row.index + 1
			),
		enableSorting: false,
	}),
	columnHelper.accessor((row) => ({ ...row }), {
		id: "user",
		cell: (info) => {
			return <TipsterInfo {...info.getValue()} />;
		},
		header: () => <span>Tipster</span>,
		enableSorting: false,
	}),
	columnHelper.accessor("form", {
		cell: (info) => (
			<div className={styles.dots}>
				{info.getValue().map((value, index) => {
					return value ? (
						<div
							key={`table_dot_${index}_${info.row.index}`}
							className={`${styles.dot} ${styles.win}`}
						/>
					) : (
						<div
							key={`table_dot_${index}_${info.row.index}`}
							className={`${styles.dot} ${styles.lose}`}
						/>
					);
				})}
			</div>
		),
		header: () => <span>Form</span>,
		enableSorting: false,
	}),
	columnHelper.accessor("betCount", {
		cell: (info) => info.getValue(),
		header: () => <span>Bets</span>,
	}),
	columnHelper.accessor("winrate", {
		cell: (info) => info.getValue() * 100 + "%",
		header: () => <span>Hitrates</span>,
	}),
	columnHelper.accessor("roi", {
		cell: (info) =>
			info.getValue() > 0 ? (
				<span className={`${styles.roi} ${styles.positive}`}>{info.getValue()}</span>
			) : (
				<span className={`${styles.roi} ${styles.negative}`}>{info.getValue()}</span>
			),
		header: () => <span>ROI</span>,
	}),
];

const TipsterCompetition: NextPage = () => {
	const { data: currentCompetition, isLoading: currentCompetitionLoading } = trpc.useQuery(["competitions.getCurrent"]);
	const { data: tipsters, isLoading: tipstersLoading } = trpc.useQuery(["tipsters.getAll"]);
	const { data: previousCompetition, isLoading: previousCompetitionLoading } = trpc.useQuery(["competitions.getPrevious"]);
	const portalNode = usePortal();

	if (currentCompetitionLoading || tipstersLoading || previousCompetitionLoading) {
		return <div>Loading...</div>;
	}

	if (!currentCompetition || !tipsters || !previousCompetition) {
		return <div>Error...</div>;
	}

	return (
		<>
			<PortalContext.Provider value={{ portalNode: portalNode }}>
				{portalNode && <OutPortal node={portalNode} />}
				<div className={styles.mainBlock}>
					<CurrentCompetition {...currentCompetition} />
				</div>
				<div className={styles.mainColumn}>
					<div className={styles.table}>
						<h2>Top 100 Tipsters</h2>
						<div className={styles.controls}>
							<TextField
								icon="/icons/search.svg"
								placeholder="Search for tipsters"
								minWidth={400}
							/>
							<div>
								<Dropdown
									items={TableDropdownItems}
									onSelect={() => {}}
									label="Tipsters by:"
									minWidth={250}
								/>
							</div>
						</div>
						<Table
							data={tipsters}
							columns={columns}
							pageSize={10}
							sortable={true}
						/>
					</div>
				</div>
				<div className={styles.sideColumn}>
					<GetStarted />
				</div>
				<div className={styles.bottomBlock}>
					<h2>The winners of previous competitions</h2>
					<div className={styles.controls}>
						<div>
							<Dropdown
								items={CompetitionDropdownItems}
								onSelect={() => {}}
								label="Time"
							/>
						</div>
						<div>
							<Dropdown
								items={CompetitionSportItems}
								onSelect={() => {}}
							/>
						</div>
					</div>
					<PreviousCompetitions competitions={previousCompetition} />
				</div>
			</PortalContext.Provider>
		</>
	);
};

const CurrentCompetition: React.FC<CurrentCompetition> = (props) => {
	const { endsOn, startedOn, leaders } = props;

	return (
		<div className={styles.currentCompetition}>
			<div className={styles.share}>
				<Image
					src="/icons/share.svg"
					height={24}
					width={24}
					alt=""
				/>
			</div>
			<Image
				src="/images/tipster-competition-background.png"
				fill
				alt=""
				style={{
					objectFit: "cover",
				}}
			/>
			<h1>Free Tipster Competition</h1>
			<div className={styles.steps}>
				<span>
					The competition will start on the{" "}
					<Moment
						date={startedOn}
						format="DD MMMM YYYY"
					/>{" "}
					and it will last untill the{" "}
					<Moment
						date={endsOn}
						format="DD MMMM YYYY"
					/>
					!
				</span>
				<span>You can join Optimo Bet Free Tipster Competition at any time</span>
				<span>You are only Allowed to have one tipster account per person</span>
			</div>
			<h2 className={styles.rewardDistribution}>Reward Distribution</h2>
			<div className={styles.leaders}>
				{leaders[1] && (
					<Leader
						{...leaders[1]}
						place={2}
					/>
				)}
				{leaders[0] && (
					<Leader
						{...leaders[0]}
						place={1}
					/>
				)}
				{leaders[2] && (
					<Leader
						{...leaders[2]}
						place={3}
					/>
				)}
			</div>
			<div className={styles.separator} />
			<div className={styles.duration}>
				<h2>Left before the end of the tournament</h2>
				<div className={styles.timeLeft}>
					<Moment
						className={styles.time}
						duration={new Date()}
						date={endsOn}
						format="DD : hh : mm"
					/>
					<div className={styles.timeHint}>
						<span>Days</span>
						<span>Hours</span>
						<span>Minutes</span>
					</div>
				</div>
				<span className={styles.text}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique hendrerit ligula, vitae finibus odio aliquet
					sit amet. Mauris semper arcu vitae neque sollicitudin lobortis vitae sit amet quam. Proin viverra nulla in tellus dictum
					faucibus. Proin a dictum nulla. Duis euismod venenatis semper. Mauris sed volutpat elit, eget egestas nulla.
					Pellentesque vitae consequat ipsum.
				</span>
			</div>
		</div>
	);
};

const Leader: React.FC<{
	name: string;
	image: string;
	prize: number;
	place: number;
}> = (props) => {
	const { image, name, place, prize } = props;

	return (
		<div className={styles.leader}>
			<span className={styles.name}>{name}</span>
			<div className={styles.avatar}>
				<div className={styles.crown}>
					<Image
						src={`/images/competition-crown-${place}.svg`}
						fill
						alt=""
					/>
				</div>
				<Image
					src={image}
					height={place === 1 ? 86 : 68}
					width={place === 1 ? 86 : 68}
					alt={name}
				/>
			</div>
			<span className={styles.prize}>$ {prize}</span>
		</div>
	);
};

const GetStarted: React.FC = () => {
	const [step, setStep] = useState<number>(1);

	return (
		<div className={styles.getStarted}>
			<h3>How can I take part in tipster competition</h3>
			<div className={styles.steps}>
				<AnimatePresence initial={false}>
					{step === 1 && (
						<CompetitionStep
							step={1}
							text="Join the competition"
							onClick={() => setStep(2)}
							key="step_1"
						/>
					)}
					{step === 2 && (
						<CompetitionStep
							step={2}
							text="Build your reputation"
							onClick={() => setStep(3)}
							key="step_2"
						/>
					)}
					{step === 3 && (
						<CompetitionStep
							step={3}
							text="Sell your tips"
							onClick={() => setStep(1)}
							key="step_3"
						/>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

const StepVariants = {
	show: {
		opacity: [0, 1],
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
	hide: {
		opacity: [1, 0],
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
};

const CompetitionStep: React.FC<{
	text: string;
	step: number;
	onClick: () => void;
}> = (props) => {
	const { onClick, step, text } = props;

	return (
		<motion.div
			className={styles.step}
			variants={StepVariants}
			initial="hide"
			animate="show"
			exit="hide"
			onClick={onClick}
		>
			<Image
				src={`/images/tipster-competition-step-${step}.svg`}
				height={46}
				width={46}
				alt=""
			/>
			<div className={styles.description}>
				<h4>{`${step} STEP`}</h4>
				<span>{text}</span>
			</div>
			<div className={styles.dots}>
				{[1, 2, 3].map((item) => (
					<span
						className={item === step ? styles.active : ""}
						key={`dot_${step}_${item}`}
					/>
				))}
			</div>
			<div className={styles.next}>
				<Image
					src="/icons/chevron-white.svg"
					height={24}
					width={24}
					alt=""
				/>
			</div>
		</motion.div>
	);
};

const PreviousCompetitions: React.FC<{ competitions: PreviousCompetitions }> = (props) => {
	const { competitions } = props;

	return (
		<div className={styles.previousCompetitions}>
			<div className={styles.background}>
				<Image
					src="/images/previous-competitions-background.png"
					fill
					alt=""
					style={{
						objectFit: "cover",
					}}
				/>
			</div>
			<Slider
				loop={true}
				autoPlay={true}
				showArrows={true}
				showPagination={false}
				arrowOptions={{
					offset: {
						next: {
							top: 24,
							side: 24,
						},
						prev: {
							top: 24,
							side: 24,
						},
					},
				}}
			>
				{competitions.map(({ endsOn, name, startedOn, users }) => (
					<div
						key={`competition_${startedOn}_${endsOn}`}
						className={styles.slide}
					>
						<div className={styles.title}>
							<h2>{name}</h2>
							<span>
								<Moment
									date={startedOn}
									format="DD MMM YYYY"
								/>{" "}
								-{" "}
								<Moment
									date={endsOn}
									format="DD MMM YYYY"
								/>
							</span>
						</div>
						<div className={styles.participants}>
							{users.map((user, index) => (
								<CompetitionParticipant
									{...user}
									place={index + 1}
									key={`participant_${index}`}
								/>
							))}
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

interface CompetitionParticipantProps {
	name: string;
	image: string;
	prize: number;
	subscriptionCost: number;
	winrate: number;
	avgProfit: number;
	subscriberCount: number;
	place: number;
}

const CompetitionParticipant: React.FC<CompetitionParticipantProps> = (props) => {
	const { avgProfit, image, name, prize, subscriberCount, subscriptionCost, winrate, place } = props;
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<PortalContext.Consumer>
				{({ portalNode }) =>
					portalNode && (
						<InPortal node={portalNode}>
							<AnimatePresence initial={false}>
								{modalOpen && (
									<TipsterModal
										// This is temporary, props will be a user object in the future
										followerCount={0}
										roi={0}
										betCount={0}
										form={[]}
										sport={{ name: "", image: "" }}
										{...props}
										onClose={() => setModalOpen(false)}
									/>
								)}
							</AnimatePresence>
						</InPortal>
					)
				}
			</PortalContext.Consumer>
			<div className={styles.participant}>
				<div className={styles.info}>
					<div className={styles.userInfo}>
						<div className={styles.avatar}>
							<Image
								src={image}
								height={74}
								width={74}
								alt=""
							/>
						</div>
						<div className={styles.detailedInfo}>
							<span className={styles.name}>{name}</span>
							<span className={styles.subscribers}>{shortenNumber(subscriberCount, 0)} subscribers</span>
							<button>
								<Image
									src="/icons/follow-white.svg"
									height={20}
									width={20}
									alt=""
								/>
								Follow
							</button>
						</div>
					</div>
					<div className={styles.competitionInfo}>
						<span className={styles.place}>{place === 1 ? "Winner" : `Place ${place}`}</span>
						<span className={styles.prize}>
							<Image
								src="/icons/cup.svg"
								height={26}
								width={26}
								alt=""
							/>
							$ {prize}
						</span>
					</div>
				</div>
				<div className={styles.stats}>
					<button onClick={() => setModalOpen(true)}>$ {subscriptionCost}/MO</button>
					<div>
						<div className={styles.stat}>
							<span>Hitrate</span>
							<span>{winrate * 100}%</span>
						</div>
						<div className={styles.stat}>
							<span>Profit</span>
							<span>$ {avgProfit}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const TipsterInfo: React.FC<inferArrayElementType<Tipsters>> = (props) => {
	const { name, image, subscriberCount } = props;
	const [modalOpen, setModalOpen] = useState(false);
	const [isHovering, setIsHovering] = useState(false);

	return (
		<>
			<PortalContext.Consumer>
				{({ portalNode }) =>
					portalNode && (
						<InPortal node={portalNode}>
							<AnimatePresence>
								{modalOpen && (
									<TipsterModal
										{...props}
										onClose={() => setModalOpen(false)}
									/>
								)}
							</AnimatePresence>
						</InPortal>
					)
				}
			</PortalContext.Consumer>
			<div className={styles.tipster}>
				<div
					className={styles.user}
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
				>
					<AnimatePresence initial={false}>{isHovering && <UserHover {...props} />}</AnimatePresence>
					<div className={styles.avatar}>
						<Image
							src={image}
							height={36}
							width={36}
							alt={name}
						/>
					</div>
					<div className={styles.userInfo}>
						<span className={styles.name}>{name}</span>
						<span className={styles.subscribers}>{shortenNumber(subscriberCount, 0)} subscribers</span>
					</div>
				</div>
				<button onClick={() => setModalOpen(!modalOpen)}>
					<Image
						src="/icons/plus-gray.svg"
						height={18}
						width={18}
						alt=""
					/>
					Subscribe
				</button>
			</div>
		</>
	);
};

const UserHoverVariants = {
	open: {
		opacity: [0, 1],
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
	closed: {
		opacity: [1, 0],
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
};

const UserHover: React.FC<inferArrayElementType<Tipsters>> = (props) => {
	const { avgProfit, name, image, sport, followerCount } = props;

	return (
		<motion.div
			className={styles.hoverContainer}
			variants={UserHoverVariants}
			initial="closed"
			animate="open"
			exit="closed"
		>
			<div className={`${styles.profit} ${avgProfit > 0 ? styles.positive : styles.negative}`}>
				<span>Avg. Monthly Profit</span>
				<span>$ {avgProfit}</span>
			</div>
			<div className={styles.userDetailed}>
				<div className={styles.infoContainer}>
					<div className={styles.user}>
						<div className={styles.avatar}>
							<Image
								src={image}
								height={60}
								width={60}
								alt=""
							/>
						</div>
						<div className={styles.userInfo}>
							<span className={styles.name}>{name}</span>
							<span className={styles.sport}>
								Top {sport.name} Tipster
								<Image
									src={sport.image}
									height={24}
									width={24}
									alt=""
								/>
							</span>
						</div>
					</div>
					<div className={styles.followers}>
						<button>
							<Image
								src="/icons/follow.svg"
								height={20}
								width={20}
								alt=""
							/>
							Follow
						</button>
						<span>{shortenNumber(followerCount, 0)} followers</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = createSSGHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});

	await ssg.prefetchQuery("competitions.getCurrent");
	await ssg.prefetchQuery("tipsters.getAll");
	await ssg.prefetchQuery("competitions.getPrevious");

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 60,
	};
};

export default TipsterCompetition;
