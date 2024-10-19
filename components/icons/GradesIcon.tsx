import * as React from "react"
import Svg, { Path } from "react-native-svg"

function GradesIcon(props: any) {
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
				d="M10.05 3.03L4.03 6.96c-1.93 1.26-1.93 4.08 0 5.34l6.02 3.93c1.08.71 2.86.71 3.94 0l5.99-3.93c1.92-1.26 1.92-4.07 0-5.33l-5.99-3.93c-1.08-.72-2.86-.72-3.94-.01z"
				stroke="#9DB2CE"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				opacity={0.4}
				d="M5.63 13.58l-.01 4.69c0 1.27.98 2.63 2.18 3.03l3.19 1.06c.55.18 1.46.18 2.02 0l3.19-1.06c1.2-.4 2.18-1.76 2.18-3.03v-4.64M21.4 15.5v-6"
				stroke="#424A55"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

export default GradesIcon
