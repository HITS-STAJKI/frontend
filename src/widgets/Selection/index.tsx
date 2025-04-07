import { Container, Flex, Text, Title } from "@mantine/core";
import { Interview, InterviewPage, InterviewStatus } from "shared/lib";
import { SelectionComments } from "features";
import './css.css';
import { CreateSelection, DeleteSelection, EditSelection } from "./ModuleWindows";


export function SearchForm() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Title size="h1">Мои отборы</Title>
            <CreateSelection id={'ГЕНЕРАТО НОВОГО ID'} />
        </div>
    );
}

export function SelectionList( { page }: { page: InterviewPage }) {
    return (
        <Container p={0} fluid style={{width: '100%' }}>
        {page.content.map(card => (
            <SelectionCard key={card.id} selection={card} />
        ))}
        </Container >
    );
}


export function SelectionCard({ selection }: { selection: Interview })  {
    return (
        <div style={{ border: '1px solid black', marginBottom: '2vh', borderRadius: '2px'}}>
            <SelectionHeaderCard selection={selection}/>
            <SelectionComments id={selection.id}/>
        </div>
    );
}

export function SelectionHeaderCard( { selection }: { selection: Interview }) {
    return (
            <Container fluid p={'lg'} style={{padding: '0', borderBottom: '1px solid black'}}>
                <Flex justify="space-between">
                    <div>
                        <Text size="xl" style={{fontWeight: '500'}}>{selection.companyPartner}</Text>
                        <Text size="xl">Направление: {selection.stack.name}</Text>
                    </div>
                    <div>
                    <Flex wrap="wrap">
                        <span className={selection.status} style={{marginBottom: '10px', whiteSpace: 'nowrap'}}>{getStatusText(selection.status)}</span>
                        <EditSelection id={selection.id} />
                        <DeleteSelection id={selection.id} />
                    </Flex>
                    </div>
                </Flex>
            </Container>
    );
}


const getStatusText = (status: InterviewStatus): string => {
    switch (status) {
        case "PENDING":
            return "В процессе";
        case "REJECTED":
            return "Отклонено";
        case "SUCCEED":
            return "Пройдено";
        default:
            return "";
    }
};