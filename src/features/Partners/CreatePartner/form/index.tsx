import { Button, FileInput, Group, TextInput, Image } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreateCompanyPartnerDto } from "services/api/api-client.types"
import { useCreatePartnerMutation, useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery"
import { useUploadFileMutation } from "services/api/api-client/FilesQuery";

type CreatePartnerFormProps = {
    onSuccess: () => void;
};

export const CreatePartnerForm = ({ onSuccess }: CreatePartnerFormProps) => {
    const { mutateAsync: createPartner } = useCreatePartnerMutation();
    const { refetch } = useGetPartnersQuery();
    const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFileMutation();

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const form = useForm<CreateCompanyPartnerDto>({
        initialValues: {
            name: "",
            description: "",
        },
    });

    const [fileId, setFileId] = useState<string | undefined>();
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleFileChange = async (file: File | null) => {
        if (!file) return;

        const uploadParams = {
            file: {
                data: file,
                fileName: file.name,
            },
        };

        try {
            const uploadedFile = await uploadFile(uploadParams);
            if (uploadedFile?.id) {
                setFileId(uploadedFile.id);

                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageSrc(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        } catch (e) {
            console.error("Ошибка загрузки файла", e);
        }
    };

    const handleRemoveIcon = () => {
        setFileId(undefined);
        setImageSrc(null);
    };

    const onSubmit = async (vals: CreateCompanyPartnerDto) => {
        await createPartner({ ...vals, fileId });
        await refetch();

        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("page", "0");

        navigate({ search: newParams.toString() });
        onSuccess();
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
                label="Название"
                key={form.key("name")}
                mb="xs"
                {...form.getInputProps("name")}
            />

            <TextInput
                label="Описание"
                key={form.key("description")}
                mb="xs"
                {...form.getInputProps("description")}
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
                    <Button variant="light" color="red" onClick={handleRemoveIcon}>
                        Удалить
                    </Button>
                </Group>
            )}

            <Button type="submit" loading={isUploading} disabled={!form.values.name.trim()}>
                Сохранить
            </Button>
        </form>
    );
};