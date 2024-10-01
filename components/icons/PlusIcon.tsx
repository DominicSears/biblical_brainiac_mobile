import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PlusIcon(props: any) {
	return (
		<Svg
			width={35}
			height={34}
			viewBox="0 0 35 34"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<Path
				d="M30.497 16.636a1.56 1.56 0 01-1.56 1.56H19.06v9.878a1.56 1.56 0 01-3.119 0v-9.878H6.062a1.56 1.56 0 110-3.12h9.878V5.2a1.56 1.56 0 113.12 0v9.878h9.877a1.56 1.56 0 011.56 1.56z"
				fill="currentColor"
			/>
		</Svg>
	)
}

export default PlusIcon 
