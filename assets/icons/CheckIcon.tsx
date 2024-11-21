import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const CheckIcon = (props: SvgProps) => (
    <Svg
        width={34}
        height={34}
        fill="none"
        {...props}
    >
        <Path
            stroke="#3056DD"
            strokeLinecap="round"
            strokeWidth={1.5}
            d="M31 7 12.64 25.297a1 1 0 0 1-1.413 0L5 19.09"
        />
    </Svg>
)
