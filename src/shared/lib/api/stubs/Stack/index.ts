import { Stack, StackPage } from "../../entities";

export const STACK1: Stack = {
    id: 'stack_id_1',
    name: 'Frontend',
}
export const STACK2: Stack = {
    id: 'stack_id_2',
    name: 'Backend',
}
export const STACK3: Stack = {
    id: 'stack_id_3',
    name: '1C',
}

export const GET_STACKS: StackPage  = {
    items: [STACK1, STACK2, STACK3],
    pagination: {
        totalPages: 1,
        currentPage: 0,
        size: 10
    }
}