import { Button } from "@mantine/core"
import { PencilSvgrepoCom } from "assets/icons"
import { Modal } from "shared/ui"
import { EditPartnerForm } from "./form"
import { CompanyPartnerDto } from "services/api/api-client.types"
import { useQueryClient } from '@tanstack/react-query'
import { QueryFactory } from '../../../services/api'

type EditPartnerButtonProps = {
    partner: CompanyPartnerDto;
};

export const EditPartnerButton = ({ partner }: EditPartnerButtonProps) => {
  const queryClient = useQueryClient();

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
                    onSuccess={async () => {
                        await queryClient.invalidateQueries({
                          queryKey: QueryFactory.CompanyPartnersQuery.getPartnerInfoQueryKey(partner.id)
                        })
                        close();
                    }}
                />
            )}
            title="Редактировать компанию"
        />
    );
};