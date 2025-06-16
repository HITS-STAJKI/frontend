import { Button } from "@mantine/core"
import { PencilSvgrepoCom } from "assets/icons"
import { Modal } from "shared/ui"
import { EditPartnerForm } from "./form"
import { CompanyPartnerDto } from "services/api/api-client.types"

type EditPartnerButtonProps = {
    partner: CompanyPartnerDto;
    onSuccess: () => void;
};

export const EditPartnerButton = ({ partner, onSuccess }: EditPartnerButtonProps) => {
    return (
        <Modal
            render={(open) => (
                <Button
                    color="gray"
                    onClick={() => open()}
                    size="md"
                    style={{ aspectRatio: '1 / 1', padding: 0 }}
                >
                    <PencilSvgrepoCom />
                </Button>
            )}
            content={({ close }) => (
                <EditPartnerForm
                    partner={partner}
                    onSuccess={() => {
                        onSuccess();
                        close();
                    }}
                />
            )}
            title="Редактировать компанию"
        />
    );
};