import { PropsWithChildren, ReactNode, useContext, useState } from "react";
import { DashboardContext } from "./context";

export const DashboardProvider = ({ children }: PropsWithChildren) => {
    const [elements, setElements] = useState<Array<ReactNode>>([])
    const addElement = (element: ReactNode) => {
        setElements([...elements, element])
    }
    const removeElement = (idx: number) => {
        setElements(elements.filter(element => element !== elements[idx]))
    }
    const updateElement = (newElement: ReactNode, idx: number) => {
        const newArray: Array<ReactNode> = [...elements]
        newArray[idx] = newElement
        setElements(newArray)
    }
    return (
        <DashboardContext.Provider value={{
            elements,
            addElement,
            removeElement,
            updateElement
        }}>
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => {
    const context = useContext(DashboardContext)
    if (!context)
        throw ''
    return context
}