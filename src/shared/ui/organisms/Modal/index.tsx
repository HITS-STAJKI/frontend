import { Modal as MModal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { ReactNode } from "react"

export type ContentProps = {
    opened: boolean
    open: () => void
    close: () => void
}

type RenderModalProps = {
    render: (open: ContentProps['open']) => ReactNode
    title: ReactNode
    content: (cp: ContentProps) => ReactNode
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "fullscreen"
}

export const Modal = ({ content, render, title, size = 'md' }: RenderModalProps) => {
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
                size={size}
            >
                {content({ opened, open, close })}
            </MModal>
            {render(open)}
        </>
    )
}