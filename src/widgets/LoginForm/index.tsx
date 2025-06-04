import { Button, Container, Flex, PasswordInput, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { LoginFormProps } from "./types"
import { useLoginMutation } from "services/api/api-client/UserQuery"
import { useNavigate } from "react-router-dom"
import { MY_PROFILE_ROUTE } from "shared/lib"

export const LoginForm = () => {
    const { onSubmit, ...form } = useForm<LoginFormProps>({
        initialValues: {
            email: '',
            password: ''
        }
    })
    const { mutateAsync } = useLoginMutation()
    const navigate = useNavigate()
    const onFormSubmit = (vals: LoginFormProps) => {
        mutateAsync(vals).then(tokens => {
            localStorage.setItem("token", tokens.token!)
            localStorage.setItem("exp", tokens.expirationDate?.toString()!)
            navigate(MY_PROFILE_ROUTE)
        })
    }
    return (
        <Container w='100%'>
            <Flex direction='column' align='center'>
                <Title order={2}>{'Вход'}</Title>
                <form onSubmit={onSubmit(onFormSubmit)} style={{ width: '100%' }}>
                    <Flex gap='md' direction='column'>
                        <TextInput label='Email' required key={form.key('email')} {...form.getInputProps('email')} />
                        <PasswordInput label='Password' required key={form.key('password')} {...form.getInputProps('password')} withAsterisk />
                        <Button type='submit'>{'Войти'}</Button>
                    </Flex>
                </form>
            </Flex>
        </Container>
    )
}