import { Pagination as MPagination } from "@mantine/core";
import { useState } from 'react';
import { GroupPage } from "shared/lib";

type PaginationProps = {
    groups: GroupPage; 
};

export const Pagination = ( { groups }: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(groups.pagination.current);
    const pageSize = groups.pagination.size;
    const totalPages = groups.pagination.count; 

    console.log("i", totalPages)


    return (
        <MPagination
            total={totalPages}
            value={currentPage + 1} 
            onChange={(page) => setCurrentPage(page - 1)}
            mt="md"
        />
    );
};

export default Pagination;