import React from 'react'
import { LeaguesByCountry } from 'src/types/queryTypes'

const NestedFilter: React.FC<{ items: LeaguesByCountry, h3?: string, h2?: string, onChange: (ids: string[]) => void }> = (props) => {
    const { items } = props

    return (
        <div>NestedFilter</div>
    )
}

export default NestedFilter
