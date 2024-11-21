import * as React from "react"
import Svg, {Path} from "react-native-svg"

export const ExchangeArrowIcon = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={139}
        height={8}
        fill="none"
        {...props}
    >
        <Path
            fill="#2E2E2E"
            d="M138.354 4.354a.5.5 0 0 0 0-.708L135.172.464a.501.501 0 0 0-.708.708L137.293 4l-2.829 2.828a.5.5 0 0 0 .708.708l3.182-3.182ZM0 4.5h138v-1H0v1Z"
        />
    </Svg>
)