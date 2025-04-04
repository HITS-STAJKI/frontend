import { Button, Flex, Group, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { InterviewsCommentCreate } from "shared/lib"

type CreateCommentFormProps = {
    id: string
}

export const CreateCommentForm = ({ id }: CreateCommentFormProps) => {
    const form = useForm<InterviewsCommentCreate>({
        initialValues: {
            content: ''
        }
    })
    const onSubmitHandler = (vals: InterviewsCommentCreate) => {
        console.log({ id: id, ...vals })
    }
    return (
        <form style={{ width: '100%' }} onSubmit={form.onSubmit(onSubmitHandler)}>
            <Flex w='100%' align='end' justify='center' direction='column' gap='sm'>
                <Textarea w='100%' key={form.key('content')} {...form.getInputProps('content')} required />
                <Group>
                    <Button type='submit'>{'Отправить'}</Button>
                </Group>
            </Flex>
        </form>
    )
}