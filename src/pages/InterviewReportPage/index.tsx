import { CommentSection } from "entity"
import { GET_INTERVIEWS_COMMENTS } from "shared/lib"

export const InterviewReportPage = () => {

    return (
        <CommentSection comments={GET_INTERVIEWS_COMMENTS.items} />
    )
}