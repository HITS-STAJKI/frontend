import { Pagination as MPagination, Flex } from "@mantine/core";
import { useState } from 'react';

type PaginationProps = {
    pagination: {
        count: number,
        current: number,
        size: number
    }; 
};

export const Pagination = ( { pagination }: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(pagination.current);
    const pageSize = pagination.size;
    const totalPages = pagination.count; 

    console.log("i", totalPages)


    return (
        <Flex
        justify="center"
        align="flex-end"
    >
        <MPagination
            total={totalPages}
            value={currentPage + 1} 
            onChange={(page) => setCurrentPage(page - 1)}
            mt="md"
        />
    </Flex>
    );
};

export default Pagination;