import { Button, Container, Flex, PasswordInput, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { RegistrationFormProps } from "./types"

export const RegistrationForm = () => {
    const { onSubmit, ...form } = useForm<RegistrationFormProps>({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    })
    const onFormSubmit = (vals: RegistrationFormProps) => {
        console.log(vals)
    }
    return (
        <Container w='100%'>
            <Flex direction='column' align='center'>
                <Title order={2}>{'Регистрация'}</Title>
                <form onSubmit={onSubmit(onFormSubmit)} style={{ width: '100%' }}>
                    <Flex gap='md' direction='column'>
                        <TextInput label='Имя' required key={form.key('firstName')} {...form.getInputProps('firstName')} />
                        <TextInput label='Фамилия' required key={form.key('lastName')} {...form.getInputProps('lastName')} />
                        <TextInput label='Email' required key={form.key('email')} {...form.getInputProps('email')} />
                        <PasswordInput label='Password' required key={form.key('password')} {...form.getInputProps('password')} />
                        <Button type='submit'>{'Зарегистрироваться'}</Button>
                    </Flex>
                </form>
            </Flex>
        </Container>
    )
}