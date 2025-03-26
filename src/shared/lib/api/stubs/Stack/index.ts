import { Stack, StackPage } from "../../entities";

const STACK1: Stack = {
    id: 'stack_id_1',
    name: 'Frontend',
}
const STACK2: Stack = {
    id: 'stack_id_2',
    name: 'Backend',
}
const STACK3: Stack = {
    id: 'stack_id_3',
    name: '1C',
}

export const GET_STACKS: StackPage  = {
    content: [STACK1, STACK2, STACK3],
    pagination: {
        count: 1,
        current: 0,
        size: 10
    }
}