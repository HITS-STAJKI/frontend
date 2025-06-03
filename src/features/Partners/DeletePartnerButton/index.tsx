import { Button } from "@mantine/core"
import { TrashSvgrepoCom } from "assets/icons"
import { Company } from "shared/lib"
import { Modal } from "shared/ui"

type DeletePartnerButtonProps = {
    partner: Company; 
}
export const DeletePartnerButton = ( { partner }: DeletePartnerButtonProps) => {
    //добавить запрос
    const handleDelete = (close: () => void) => {
        close()
    }

    return (
        <Modal
            title={`Вы уверены, что хотите удалить компанию ${partner.name}?`}
            render={open => <Button color="red" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <TrashSvgrepoCom/>
            </Button>}
            content={({ close }) => <Button onClick={() => handleDelete(close)} color='red'>{'Удалить'}</Button>}
        />
    )
}