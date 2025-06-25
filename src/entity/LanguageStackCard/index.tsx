import { Card, Flex, Text } from "@mantine/core";
import { DeleteLanguageOrStack, EditLanguageOrStack } from "features";
import { Language } from "shared/lib";

export function LanguageStackCard({ id, name, type, index }: Language & { type: 'language' | 'stack' } & {index: number}) {

    return (
        <Card shadow="sm" padding="lg" style={{ width: '100%', height: '64px' }}>
            <Flex justify="space-between" align="center" style={{ height: '100%' }}>
                <Flex gap="md">
                <Text>{index + 1}</Text>
                <Text>{name}</Text>

                </Flex>
                
                <Flex gap="md">
                    <EditLanguageOrStack id={id} type={type} name={name}/>
                    <DeleteLanguageOrStack id={id} type={type} />
                </Flex>
            </Flex>
        </Card>
    )
}
