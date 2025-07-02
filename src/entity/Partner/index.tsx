import { Avatar, Card, Group, MantineColor, Text, Image } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShortCompanyPartnerDto } from "services/api/api-client.types";
import { useDownloadFileQuery } from 'services/api/api-client/FilesQuery';

interface PartnerProps {
    partner: ShortCompanyPartnerDto;
}

const AvatarColor: Array<MantineColor> = ['dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange', 'teal']

function hashCode(str: string): number {
    return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

export const Partner = ({ partner }: PartnerProps) => {
    const navigate = useNavigate()
    const handleCardClick = () => navigate(`/partner/${partner.id}`)

    const hasFile = Boolean(partner.fileId)
    const { data: fileData } = useDownloadFileQuery(partner.fileId ?? '', {
        enabled: hasFile,
    })

    const [imageSrc, setImageSrc] = useState<string | null>(null)

    useEffect(() => {
        if (fileData?.data) 
        {
            const reader = new FileReader()
            reader.onloadend = () => setImageSrc(reader.result as string)
            reader.readAsDataURL(fileData.data)
        }
    }, [fileData])

    const avatar = imageSrc ? (
        <Image src={imageSrc} alt="Иконка компании" style={{ maxWidth: 100, maxHeight: 100, width: 'auto', height: 'auto', display: 'block' }}/>
    ) : (
        <Avatar
            size="lg"
            radius="xl"
            color={AvatarColor[Math.abs(hashCode(partner.id)) % AvatarColor.length]}
        >
            {partner.name[0]?.toUpperCase() ?? '?'}
        </Avatar>
    )

    return (
        <Card shadow="sm" withBorder mb="xs" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <Group align="center">
                {avatar}
                <Text ml="sm">{partner.name}</Text>
            </Group>
        </Card>
    )
}

export const PartnerEmpty = () => {
    return (
        <Card shadow="sm" withBorder mb="xs" style={{ cursor: 'pointer' }}>
            <Group align="center">
                <Text style={{ whiteSpace: 'pre' }}>{"                                                                                        "}</Text>
            </Group>
        </Card>
    )
}