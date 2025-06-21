import { Button, Text } from "@mantine/core"
import { TrashSvgrepoCom } from "assets/icons"
import { useNavigate, useParams } from "react-router-dom"
import { CompanyPartnerDto } from "services/api/api-client.types"
import { useDeletePartnerMutation } from "services/api/api-client/CompanyPartnersQuery"
import { Modal } from "shared/ui"
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage"

type DeletePartnerButtonProps = {
    partner: CompanyPartnerDto;
}
export const DeletePartnerButton = ({ partner }: DeletePartnerButtonProps) => {
    const { id } = useParams();
    const { mutateAsync, error, isError } = useDeletePartnerMutation(id!);
    const navigate = useNavigate();

    const handleDelete = (close: () => void) => {
        mutateAsync()
        .then(() => {
            close();
            navigate("/partners");
        })
        .catch(() => {});
    };

    return (
        <Modal
            title={`Вы уверены, что хотите удалить компанию ${partner.name}?`}
            render={(open) => (
                <Button
                    color="red"
                    onClick={() => open()}
                    size="md"
                    style={{ aspectRatio: "1 / 1", padding: 0 }}
                >
                <TrashSvgrepoCom />
                </Button>
            )}
            content={({ close }) => (
                <>
                    <Button onClick={() => handleDelete(close)} color="red">
                        Удалить
                    </Button>
                    {isError && (
                        <Text color="red" size="sm" style={{ textAlign: "center", marginTop: 10 }}>
                            {getErrorMessage(error)}
                        </Text>
                    )}
                </>
            )}
        />
    );
};