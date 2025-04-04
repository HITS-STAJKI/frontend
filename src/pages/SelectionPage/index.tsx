import { CreateEditSelection } from "widgets/Selection"
import { SelectionComments } from "widgets/Selection/Comment/SelectionComments"

export const SelectionPage = () => {
    return (
        <>
            <SelectionComments />
            <CreateEditSelection type="create"/> {/*Замени type на edit, чтобы вызвать окно изменения*/}
        </>
    )
}
