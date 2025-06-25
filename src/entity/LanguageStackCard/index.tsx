import { Card, Flex, Text } from "@mantine/core";
import { DeleteLanguageOrStack, EditLanguageOrStack } from "features";
import { LanguageDto } from '../../services/api/api-client.types.ts'

export function LanguageStackCard({ id, name, type, index, query }: LanguageDto & { type: 'language' | 'stack' } & {index: number} & {query?: string }) {

    return (
        <Card shadow="sm" padding="lg" style={{ width: '100%', height: '64px' }}>
            <Flex justify="space-between" align="center" style={{ height: '100%' }}>
                <Flex gap="md">
                <Text>{index + 1}</Text>
                <Text>{name}</Text>

                </Flex>
                
                <Flex gap="md">
                    <EditLanguageOrStack id={id} type={type} name={name} query={query}></EditLanguageOrStack>
                    <DeleteLanguageOrStack id={id} type={type} query={query} />
                </Flex>
            </Flex>
        </Card>
    )
}
