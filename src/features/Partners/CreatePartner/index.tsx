import { Button } from "@mantine/core"
import { Modal } from "shared/ui";
import { CreatePartnerForm } from "./form";
import { useQueryClient } from '@tanstack/react-query'
import { QueryFactory } from '../../../services/api'

export const CreatePartner = () => {
    const queryClient = useQueryClient();
    
    return (
      <Modal
        render={open => <Button onClick={() => open()}>{'Создать компанию'}</Button>}
        content={({ close }) => (
          <CreatePartnerForm
            onSuccess={async () => {
                await queryClient.invalidateQueries({
                    queryKey: QueryFactory.CompanyPartnersQuery.getPartnersQueryKey()
                })
              close()
            }}
          />
        )}
        title={'Создать компанию'}
      />
    )
}