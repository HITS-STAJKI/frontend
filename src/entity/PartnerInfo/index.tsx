import { Title, Container, Flex, Group, Image, Text, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { DeletePartnerButton } from "features/Partners/DeletePartnerButton";
import { EditPartnerButton } from "features/Partners/EditPartnerButton";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyPartnerDto } from "services/api/api-client.types";
import { useDownloadFileQuery } from 'services/api/api-client/FilesQuery';

type PartnerInfoProps = {
    partner: CompanyPartnerDto;
    refetch: () => void;
};

export const PartnerInfo = ({ partner, refetch }: PartnerInfoProps) => {
    const navigate = useNavigate();

    const hasFile = Boolean(partner.fileId);
    const { data: fileData } = useDownloadFileQuery(partner.fileId ?? '', {
        enabled: hasFile,
    });

    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        if (fileData?.data) {
            const reader = new FileReader();
            reader.onloadend = () => setImageSrc(reader.result as string);
            reader.readAsDataURL(fileData.data);
        }
    }, [fileData]);

    return (
        <Container w="100%">
            <Flex justify="space-between" align="center" mb="md">
                <Group align="center">
                    {imageSrc && (
                        <Image src={imageSrc} alt="Иконка компании" style={{ maxWidth: 100, maxHeight: 100, width: 'auto', height: 'auto', display: 'block' }}/>
                    )}
                    <Title order={1}>{partner.name}</Title>
                </Group>

                <Group>
                    <EditPartnerButton partner={partner} onSuccess={refetch} />
                    <DeletePartnerButton partner={partner} />
                    <Button variant="outline" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate('/partners')}>
                        Назад
                    </Button>
                </Group>
            </Flex>

            <Text>{partner.description}</Text>
        </Container>
    );
};
