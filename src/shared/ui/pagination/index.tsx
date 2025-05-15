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
      align="center"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'white', 
        padding: '10px 0',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.05)', 
        zIndex: 1000,
      }}
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