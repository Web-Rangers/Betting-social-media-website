import React, { ReactNode } from 'react'
import styles from '@styles/components/layout/MatchesLayout.module.css'
import DatePicker from "@components/ui/DatePicker"
import NestedFilter from "@components/ui/NestedFilter"
import { trpc } from "src/utils/trpc"

interface MatchesLayoutProps {
    children?: JSX.Element | JSX.Element[];
}

const MatchesLayout: React.FC<MatchesLayoutProps> = (props) => {
    const { children } = props;

    const { data: leagues, isLoading: leaguesLoading } = trpc.useQuery([
		"filters.getLeaguesByCountry",
	]);

    return (
        <>
            <div className={styles.sideCol}>
                {!leaguesLoading &&
                    <div className={styles.filters}>
				    	<DatePicker onChange={() => {}} />
				    	<NestedFilter
				    		items={leagues}
				    		h3="BY COUNTRY"
				    		h2="Choose Matches"
				    		onChange={() => {}}
				    	/>
				    	<NestedFilter
				    		items={leagues}
				    		h3="OTHER COUNTRIES"
				    		onChange={() => {}}
				    		withClearButton={false}
				    		colapsible={true}
				    	/>
				    </div>
                }
            </div>
            {children}
        </>
    )
}

export default MatchesLayout;