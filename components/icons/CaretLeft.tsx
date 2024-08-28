import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CaretLeft(props: any) {
	return (
		<Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
			<Path fill="none" d="M0 0H256V256H0z" />
			<Path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={16}
				d="M160 208L80 128 160 48"
			/>
		</Svg>
	)
}

export default CaretLeft
