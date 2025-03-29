import { Partner } from "entity"
import { GET_COMPANIES } from "shared/lib"

export const PartnerList = () => {

    return (
        <div style={{ marginTop: "3vh" }}>
            {GET_COMPANIES.content.map((partner) => (
                <Partner key={partner.id} partner={partner} /> 
            ))}
        </div>
    )
}
