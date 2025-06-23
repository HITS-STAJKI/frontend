import { Title, Container, Flex, Group, Image, Text, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { DeletePartnerButton } from "features/Partners/DeletePartnerButton";
import { EditPartnerButton } from "features/Partners/EditPartnerButton";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyPartnerDto } from "services/api/api-client.types";
import { useDownloadFileQuery } from 'services/api/api-client/FilesQuery';
import { Roles, WithProfileRole } from 'shared/lib';

type PartnerInfoProps = {
    partner: CompanyPartnerDto;
    refetch: () => void;
};

export const PartnerInfo = ({ partner, refetch }: PartnerInfoProps) => {
    const navigate = useNavigate();

    const hasFile = Boolean(partner.fileId);
    const { data: fileData, error: downloadError, isError: isDownloadError } = useDownloadFileQuery(partner.fileId ?? '', {
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

    const getErrorMessage = (error: unknown): string => {
        if (!error) {
            return 'Неизвестная ошибка';
        }
        if (typeof error === 'object' && error !== null) {
            const err = error as any;
            if (err.message) {
                return err.message;
            }
            if (err.response?.data?.message) {
                return err.response.data.message;
            }
        }
        return 'Произошла ошибка при загрузке файла';
    };

    return (
        <Container w="100%">
            <Flex justify="space-between" align="center" mb="md">
                <Group align="center">
                    {imageSrc && (
                        <Image src={imageSrc} alt="Иконка компании" style={{ maxWidth: 100, maxHeight: 100, width: 'auto', height: 'auto', display: 'block' }} />
                    )}
                    <Title order={1}>{partner.name}</Title>
                </Group>

                <Group>
                    <WithProfileRole
                        render={
                            <>
                                <EditPartnerButton partner={partner} onSuccess={refetch} />
                                <DeletePartnerButton partner={partner} />
                            </>
                        }
                        usersFor={[Roles.DEAN, Roles.EDUCATION_PROGRAM_LEAD, Roles.CURATOR]}
                    />

                    <Button variant="outline" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate('/partners')}>
                        Назад
                    </Button>
                </Group>
            </Flex>

            <Text>{partner.description}</Text>

            {isDownloadError && (
                <Container mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6 }}>
                    <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                        Ошибка при загрузке файла: {getErrorMessage(downloadError)}
                    </Text>
                </Container>
            )}
        </Container>
    );
};
