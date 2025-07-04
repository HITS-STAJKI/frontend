import { Button, FileInput, Group, TextInput, Image, Container, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreateCompanyPartnerDto } from "services/api/api-client.types"
import { useCreatePartnerMutation, useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery"
import { useDeleteFileMutationWithParameters, useUploadFileMutation } from "services/api/api-client/FilesQuery";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

type CreatePartnerFormProps = {
    onSuccess: () => void;
};

export const CreatePartnerForm = ({ onSuccess }: CreatePartnerFormProps) => {
    const { mutateAsync: createPartner, isError: isCreateError, error: createError } = useCreatePartnerMutation();
    const { refetch, isError: isPartnersError, error: partnersError } = useGetPartnersQuery();
    const { mutateAsync: uploadFile, isPending: isUploading, isError: isUploadError, error: uploadError } = useUploadFileMutation();
    const { mutateAsync: deleteFileMutation, isError: isDeleteFileError, error: deleteFileError } = useDeleteFileMutationWithParameters();

    const errors = [
        isCreateError ? getErrorMessage(createError) : null,
        isPartnersError ? getErrorMessage(partnersError) : null,
        isUploadError ? getErrorMessage(uploadError) : null,
        isDeleteFileError ? getErrorMessage(deleteFileError) : null
    ].filter(Boolean);

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
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteFileFromServer = async (id: string) => {
        try 
        {
            setIsDeleting(true);
            await deleteFileMutation({ id });
        } 
        catch (e) 
        {
            console.error("Ошибка при удалении файла:", e);
        } 
        finally 
        {
            setIsDeleting(false);
        }
    };

    const handleFileChange = async (file: File | null) => {
        if (!file) return;

        if (file.size > 25 * 1024 * 1024) 
        {
            alert("Файл слишком большой. Максимальный размер — 25 МБ.");
            return;
        }

        if (fileId) 
        {
            await deleteFileFromServer(fileId);
        }

        try 
        {
            const uploadedFile = await uploadFile({
                file: {
                    data: file,
                    fileName: file.name,
                },
            });

            if (uploadedFile?.id) 
            {
                setFileId(uploadedFile.id);

                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageSrc(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        } 
        catch (e) 
        {
            console.error("Ошибка загрузки файла", e);
        }
    };

    const handleRemoveIcon = async () => {
        if (fileId) 
        {
            await deleteFileFromServer(fileId);
        }
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

    const isProcessing = isUploading || isDeleting;
    const isSubmitDisabled = isProcessing || !form.values.name.trim() || !form.values.description.trim();

    return (
        <>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <TextInput
                    label="Название"
                    required
                    key={form.key("name")}
                    mb="xs"
                    {...form.getInputProps("name")}
                />

                <TextInput
                    label="Описание"
                    required
                    key={form.key("description")}
                    mb="xs"
                    {...form.getInputProps("description")}
                />

                <FileInput
                    label="Иконка компании"
                    accept="image/*"
                    mb="xs"
                    onChange={handleFileChange}
                    disabled={isProcessing}
                />

                {imageSrc && (
                    <Group mb="xs">
                        <Image
                            src={imageSrc}
                            alt="Иконка компании"
                            style={{ maxWidth: 100, maxHeight: 100, width: "auto", height: "auto", display: "block" }}
                        />
                        <Button variant="light" color="red" onClick={handleRemoveIcon} disabled={isProcessing}>
                            Удалить
                        </Button>
                    </Group>
                )}

                <Button type="submit" loading={isProcessing} disabled={isSubmitDisabled}>
                    Сохранить
                </Button>
            </form>
            {errors.length > 0 && (
                <Container mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6 }}>
                    {errors.map((msg, i) => (
                        <Text key={i} color="red" size="sm" style={{ textAlign: 'center' }} mb="xs">
                            Ошибка: {msg}
                        </Text>
                    ))}
                </Container>
            )}
        </>
    );
};