//@ts-nocheck
import { Button } from "@mantine/core"
import { PencilSvgrepoCom } from "assets/icons"
import { Modal } from "shared/ui"
import { UpdateLanguageOrStackForm } from "./form"
import { LanguageDto } from '../../../services/api/api-client.types.ts'

type EditLanguageOrStackProps = {
    type: 'language' | 'stack'
    query?: string
} & LanguageDto

export const EditLanguageOrStack = ({ id, type, name, query }: EditLanguageOrStackProps) => {

    return (
        <Modal
            render={open => <Button color="gray" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <PencilSvgrepoCom />
            </Button>}
            content={({ close }) => <UpdateLanguageOrStackForm type={type} query={query} id={id} name={name} onSuccess={close} />}
            title={'Вы уверены, что хотите изменить данный элемент?'}
        />

    )
}