import { Title, Container, Flex, Group } from '@mantine/core';
import { DeletePartnerButton } from "features/Partners/DeletePartnerButton";
import { EditPartnerButton } from "features/Partners/EditPartnerButton";
import { CompanyPartnerDto } from "services/api/api-client.types";

type PartnerInfoProps = {
    partner: CompanyPartnerDto;
}

export const PartnerInfo = ({ partner }: PartnerInfoProps) => {

    return (
        <Container w='100%'>
            <Flex >
                <Group>
                    <Title order={1}>{partner.name}</Title>
                    <EditPartnerButton partner={partner} />
                    <DeletePartnerButton partner={partner} />
                </Group>
            </Flex>
            <div>{partner.description}</div>
        </Container>
    )
}