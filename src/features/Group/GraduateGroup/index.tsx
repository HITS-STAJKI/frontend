import { Button } from "@mantine/core"
import { Modal } from "shared/ui"
import { GroupDto } from "services/api/api-client.types";
import { useQueryClient } from '@tanstack/react-query'
import { useGraduateGroupMutation } from "services/api/api-client/GraduationQuery.ts"
import { QueryFactory } from "services/api"
import { IconArrowBadgeRight } from '@tabler/icons-react'

type GraduateGroupButtonProps = {
  group: GroupDto
}

export const GraduateGroupButton = ({ group }: GraduateGroupButtonProps) => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useGraduateGroupMutation(group.id!)
  const handleGraduate = async (close: () => void) => {
    await mutateAsync()
    await queryClient.invalidateQueries({
      queryKey: QueryFactory.GroupQuery.getGroupsQueryKey()
    })
    close()
  }

  return (
    <Modal
      title={`Вы уверены, что хотите выпустить группу ${group.number}?`}
      render={open => <Button color="green" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
        <IconArrowBadgeRight/>
      </Button>}
      content={({ close }) => <Button onClick={() => handleGraduate(close)} color='green'>{'Выпустить'}</Button>}
    />
  )
}