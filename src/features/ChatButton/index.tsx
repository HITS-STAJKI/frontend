import { Box, Flex, Loader, Text } from "@mantine/core"
import { useGetMyChatInfoQuery } from "services/api/api-client/ChatControllerQuery"
import { useGetCurrentUserQuery } from "services/api/api-client/UserQuery"
import { CommentSelection } from "widgets/Selection/ModuleWindows"

export const ChatButton = () => {
    const { data, isLoading } = useGetCurrentUserQuery()
    const { data: chatData, refetch } = useGetMyChatInfoQuery()
    if (isLoading) {
        return <Loader />
    }
    if (!data?.student?.chatId)
        return <></>
    return <Flex gap={'xl'} align='center'>
        <CommentSelection id={data?.student?.chatId!} refetchStudent={refetch} />
        {chatData?.unreadCount != null && chatData?.unreadCount > 0 && (
            <Box style={{ padding: '4px 8px', border: '1px solid #ff6b6b', borderRadius: '12px', color: 'black', fontWeight: 500, fontSize: '14px', minWidth: '24px', textAlign: 'center' }} >
                {chatData?.unreadCount > 9 ? '9+' : chatData?.unreadCount}
            </Box>
        )}</Flex>
}