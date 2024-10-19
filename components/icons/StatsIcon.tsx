import * as React from "react"
import Svg, { Path } from "react-native-svg"

function StatsIcon(props: any) {
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
				opacity={0.4}
				d="M3 22.5h18"
				stroke="#424A55"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M5.6 8.88H4c-.55 0-1 .45-1 1v8.62c0 .55.45 1 1 1h1.6c.55 0 1-.45 1-1V9.88c0-.55-.45-1-1-1zM12.8 5.69h-1.6c-.55 0-1 .45-1 1V18.5c0 .55.45 1 1 1h1.6c.55 0 1-.45 1-1V6.69c0-.55-.45-1-1-1zM20 2.5h-1.6c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1H20c.55 0 1-.45 1-1v-15c0-.55-.45-1-1-1z"
				stroke="#9DB2CE"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

export default StatsIcon
