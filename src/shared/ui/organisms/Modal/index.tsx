import { Modal as MModal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { ReactNode } from "react"

type ContentProps = {
    opened: boolean
    open: () => void
    close: () => void
}

type RenderModalProps = {
    render: (open: ContentProps['open']) => ReactNode
    title: ReactNode
    content: (cp: ContentProps) => ReactNode
}

export const Modal = ({ content, render, title }: RenderModalProps) => {
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <>
            <MModal
                opened={opened}
                onClose={close}
                title={title}
                centered
                overlayProps={{
                    opacity: 0.55,
                    blur: 3,
                }}
                zIndex={300}
            >
                {content({ opened, open, close })}
            </MModal>
            {render(open)}
        </>
    )
}