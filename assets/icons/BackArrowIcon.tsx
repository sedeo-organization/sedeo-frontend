import * as React from "react"
import Svg, {Path} from "react-native-svg"

export const BackArrowIcon = (props: any) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke="#2E2E2E"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 12h16M9 17s-5-3.682-5-5 5-5 5-5"
        />
    </Svg>
)