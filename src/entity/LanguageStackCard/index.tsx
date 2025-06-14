import { Card, Flex, Text } from "@mantine/core";
import { DeleteLanguageOrStack, EditLanguageOrStack } from "features";
import { Language } from "shared/lib";

export function LanguageStackCard({ id, name, type }: Language & { type: 'language' | 'stack' }) {

    return (
        <Card shadow="sm" padding="lg" style={{ width: '100%', height: '64px' }}>
            <Flex justify="space-between" align="center" style={{ height: '100%' }}>
                <Text>{name}</Text>
                <Flex gap="md">
                    <EditLanguageOrStack id={id} type={type} name={name}></EditLanguageOrStack>
                    <DeleteLanguageOrStack id={id} type={type} />
                </Flex>
            </Flex>
        </Card>
    )
}
