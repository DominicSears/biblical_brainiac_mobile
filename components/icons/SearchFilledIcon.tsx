import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SearchFilledIcon(props: any) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<Path
				d="M11.5 21a9.5 9.5 0 100-19 9.5 9.5 0 000 19zM21.3 21.999c-.18 0-.36-.07-.49-.2l-1.86-1.86a.706.706 0 010-.99c.27-.27.71-.27.99 0l1.86 1.86c.27.27.27.71 0 .99-.14.13-.32.2-.5.2z"
				fill="currentColor"
			/>
		</Svg>
	)
}

export default SearchFilledIcon
