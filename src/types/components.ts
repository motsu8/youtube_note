import { IconProp } from "@fortawesome/fontawesome-svg-core"

export type SideContent = {
    toggle: boolean,
    icon: IconProp,
    iconClass: string,
    iconColor: string,
    setClickHandler?: () => void,
    title: string
}