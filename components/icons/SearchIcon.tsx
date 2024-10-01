import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SearchIcon(props: any) {
	return (
		<Svg
			width={24}
			height={25}
			viewBox="0 0 24 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<Path
				d="M11.5 21.5a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
				stroke="#9DB2CE"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				opacity={0.4}
				d="M22 22.5l-2-2"
				stroke={props.colorScheme === 'light' ? "#424A55" : '#6C7489'}
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

export default SearchIcon
