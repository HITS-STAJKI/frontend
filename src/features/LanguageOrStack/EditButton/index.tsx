//@ts-nocheck
import { Button } from "@mantine/core"
import { PencilSvgrepoCom } from "assets/icons"
import { Modal } from "shared/ui"
import { UpdateLanguageOrStackForm } from "./form"
import { Language } from "shared/lib"

type EditLanguageOrStackProps = {
    type: 'language' | 'stack'
} & Language

export const EditLanguageOrStack = ({ id, type, name }: EditLanguageOrStackProps) => {
    const handleEdit = (close: () => void) => {
        if (type === 'language') {
            //изменяем по 1 типу
        }
        else {
            //изменяем по 2 типу
        }
        close()
    }

    return (
        <Modal
            render={open => <Button color="gray" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <PencilSvgrepoCom />
            </Button>}
            content={({ close }) => <UpdateLanguageOrStackForm id={id} name={name} onSuccess={close} />}
            title={'Вы уверены, что хотите изменить данный элемент?'}
        />

    )
}