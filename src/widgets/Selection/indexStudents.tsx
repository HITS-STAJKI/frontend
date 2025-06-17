import { Button, Container, Flex, Group, MultiSelect, Text, TextInput, Title } from "@mantine/core";
import { GET_STACKS, Interview, InterviewPage, InterviewStatus} from "shared/lib";
import './css.css';
import { CommentSelection, CreateSelection, DeleteSelection, EditSelection, SuccedSelection } from "./ModuleWindows";
import { useForm } from "@mantine/form";

// --------------- Student ---------------

export function TitleForm() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Title size="h1">Мои отборы</Title>
            <CreateSelection id={'ГЕНЕРАТОР НОВОГО ID'} />
        </div>
    );
}

// type SelectionSearchFormProps = {
//     onSuccess: () => void;
// }

type FiltrationValues = {
    company: string;
    stackId: string[];
};

export const SelectionSearchForm = (/*{ onSuccess }: SelectionSearchFormProps*/) => {
    const form = useForm<FiltrationValues>({
        mode: 'uncontrolled',
        initialValues: {
            company: '',
            stackId: []
        }
    });

    const onSubmit = (vals : {company: string, stackId: string}) => {
        console.log(`Запрос фильтрации`, vals); // Тело запроса для изменения
        //onSuccess();
    };
    return (
        <Container p={0} fluid style={{width: '100%', border: '1px solid black', marginBottom: '5vh', borderRadius: '2px' }}>
            <form>
                <Group gap="xl" wrap="nowrap">
                    <TextInput w={300} style={{margin:'2%'}}
                            label="Название компании" 
                            {...form.getInputProps('company')}
                        />
                    <MultiSelect miw={150} style={{ margin:'2%'}}
                        label="Направление"
                        onChange={(value) => form.setFieldValue('stackId', value)}
                        data={GET_STACKS.items.map(option => {
                            return { value: option.id, label: option.name };
                        })}/>
                </Group>
                <hr style={{margin: 'auto', marginLeft: '10px', marginRight: '10px'}}/>
                <div style={{ display: 'flex', justifyContent: 'end'}} >
                    <Button type='submit' style={{ marginLeft: 'auto', margin:'1%' }}>{'Поиск'}</Button>
                </div>
            </form>
        </Container >
    );
}


export function SelectionStudentList( { page }: { page: InterviewPage }) {
    return (
        <Container p={0} fluid style={{width: '100%' }}>
        {page.items.map(card => (
            <SelectionCard key={card.id} selection={card} />
        ))}
        </Container >
    );
}


export function SelectionCard({ selection }: { selection: Interview })  {
    return (
        <div style={{ border: '1px solid black', marginBottom: '2vh', borderRadius: '2px'}}>
            <SelectionHeaderCard selection={selection}/>
            {/*<SelectionComments id={selection.id}/>*/}
        </div>
    );
}

export function SelectionHeaderCard( { selection }: { selection: Interview }) {
    return (
            <Container fluid p={'lg'} style={{padding: '0'}}>
                <Flex justify="space-between">
                    <div>
                        <Text size="xl" style={{fontWeight: '500'}}>{selection.companyPartner.name}</Text>
                        <Text size="xl">Направление: {selection.stack.name}</Text>
                    </div>
                    <div>
                    <Flex wrap="wrap">
                        <span className={selection.status} style={{whiteSpace: 'nowrap'}}>{getStatusText(selection.status)}</span>
                        {selection.status === "SUCCEED" && (
                            <>
                            <span style={{ lineHeight: '1', fontSize: '30px', margin: '0 5px' }}>/</span>
                            <SuccedSelection id={selection.id} />
                            </>
                        )}
                        <CommentSelection id={selection.id} />
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