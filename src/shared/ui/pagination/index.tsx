import { Pagination as MPagination, Flex } from "@mantine/core";
import { useState } from 'react';
import { PagedListDtoShortCompanyPartnerDto } from "services/api/api-client.types";


export const Pagination = ({ pagination }: Pick<PagedListDtoShortCompanyPartnerDto, 'pagination'>) => {
    const [currentPage, setCurrentPage] = useState(pagination);
    const totalPages = pagination?.totalPages;
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
                total={totalPages!}
                value={currentPage?.currentPage! + 1}
                onChange={(page) => setCurrentPage({
                    size: currentPage?.size,
                    totalPages: currentPage?.totalPages,
                    totalElements: currentPage?.totalElements,
                    currentPage: page - 1
                })}
                mt="md"
            />
        </Flex>
    );
};

export default Pagination;