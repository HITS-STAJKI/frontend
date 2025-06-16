import { createContext, ReactNode } from "react"

type DashboardContextProps = {
    elements: Array<ReactNode>
    addElement: (element: ReactNode) => void
    removeElement: (idx: number) => void
    updateElement: (newElement: ReactNode, idx: number) => void
}

export const DashboardContext = createContext<DashboardContextProps | undefined>(undefined)