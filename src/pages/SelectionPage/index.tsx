import { CreateSelection, EditSelection } from "widgets/Selection"
import { SelectionComments } from "widgets/Selection/Comment/SelectionComments"

export const SelectionPage = () => {
    return (
        <>
            <SelectionComments />
            <CreateSelection /> {/*Замени type на edit, чтобы вызвать окно изменения*/}
            <EditSelection />
        </>
    )
}
