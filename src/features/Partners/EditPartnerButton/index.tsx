import { Button } from "@mantine/core"
import { PencilSvgrepoCom } from "assets/icons"
import { Modal } from "shared/ui"
import { EditPartnerForm } from "./form"
import { Company } from "shared/lib"

type EditPartnerButtonProps = {
    partner: Company
} 

export const EditPartnerButton = ({ partner }: EditPartnerButtonProps) => {

    return (
        <Modal
            render={open => <Button color="gray" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <PencilSvgrepoCom />
            </Button>}
            content={({ close }) => <EditPartnerForm partner={partner} onSuccess={() => close()} />}
            title={'Редактировать компанию'}
        />

    )
}