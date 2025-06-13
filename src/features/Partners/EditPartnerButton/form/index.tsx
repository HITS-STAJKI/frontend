import { Button, FileInput, Group, TextInput, Textarea, Image } from "@mantine/core"
import { useForm } from "@mantine/form"
import { CompanyUpdate } from "shared/lib"
import { CompanyPartnerDto } from "services/api/api-client.types"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useGetPartnerInfoQuery, useUpdatePartnerInfoMutation } from "services/api/api-client/CompanyPartnersQuery"
import { useDeleteFileMutation, useDownloadFileQuery, useUploadFileMutation } from "services/api/api-client/FilesQuery"
import { useEffect, useState } from "react"

type EditPartnerFormProps = {
    onSuccess: () => void;
    partner: CompanyPartnerDto;
};

export const EditPartnerForm = ({ onSuccess, partner }: EditPartnerFormProps) => {
    const { id } = useParams();

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const form = useForm<CompanyUpdate>({
        initialValues: {
            name: partner.name,
            description: partner.description,
        },
        validate: {
            name: (value) => (value.trim().length === 0 ? 'Название обязательно' : null),
        },
    });

    const { mutateAsync: updatePartner } = useUpdatePartnerInfoMutation(id!);
    const { refetch } = useGetPartnerInfoQuery(id!);

    const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFileMutation();
    const { data: fileData } = useDownloadFileQuery(partner.fileId ?? '', {
        enabled: Boolean(partner.fileId),
    });

    const [fileId, setFileId] = useState<string | undefined>(partner.fileId);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const { mutateAsync: deleteFile, isPending: isDeleting } = useDeleteFileMutation(fileId ?? '');

    useEffect(() => {
        if (fileData?.data) {
            const reader = new FileReader();
            reader.onloadend = () => setImageSrc(reader.result as string);
            reader.readAsDataURL(fileData.data);
        }
    }, [fileData]);

    const handleFileChange = async (file: File | null) => {
        if (!file) return;

        try {
            const uploadedFile = await uploadFile({
                file: {
                    data: file,
                    fileName: file.name,
                },
            });

            if (uploadedFile?.id) {
                setFileId(uploadedFile.id);
                const reader = new FileReader();
                reader.onloadend = () => setImageSrc(reader.result as string);
                reader.readAsDataURL(file);
            }
        } catch (e) {
            console.error("Ошибка загрузки файла", e);
        }
    };

    const handleRemoveIcon = async () => {
        if (!fileId) return;

        try {
            await deleteFile();
            setFileId(undefined);
            setImageSrc(null);
        } catch (e) {
            console.error("Ошибка удаления файла", e);
        }
    };

    const handleEdit = async (vals: CompanyUpdate) => {
        const payload: CompanyUpdate & { fileId?: string } = {
            ...vals,
            ...(fileId ? { fileId } : {}),
        };

        await updatePartner(payload);
        onSuccess();

        navigate({
            pathname: window.location.pathname,
            search: searchParams.toString(),
        });

        window.location.reload();
    };

    return (
        <form onSubmit={form.onSubmit(handleEdit)}>
            <TextInput
                required
                label="Название компании"
                {...form.getInputProps("name")}
                error={form.errors.name}
                mb="xs"
            />

            <Textarea
                required
                autosize
                minRows={2}
                maxRows={16}
                label="Описание компании"
                {...form.getInputProps("description")}
                error={form.errors.description}
                mb="xs"
            />

            <FileInput
                label="Иконка компании"
                accept="image/*"
                mb="xs"
                onChange={handleFileChange}
                disabled={isUploading}
            />

            {imageSrc && (
                <Group mb="xs">
                    <Image src={imageSrc} alt="Иконка компании" style={{ maxWidth: 100, maxHeight: 100, width: 'auto', height: 'auto', display: 'block' }}/>
                    <Button
                        variant="light"
                        color="red"
                        onClick={handleRemoveIcon}
                        loading={isDeleting}
                        disabled={isDeleting}
                    >
                        Удалить
                    </Button>
                </Group>
            )}

            <Button
                type="submit"
                loading={isUploading || isDeleting}
                disabled={!form.isValid()}
            >
                Сохранить
            </Button>
        </form>
    );
};