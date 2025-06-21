import { Pagination as MPagination, Flex } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { PagedListDtoInterviewDto, PagedListDtoShortCompanyPartnerDto } from "services/api/api-client.types";

type PaginationProps = 
    | Pick<PagedListDtoInterviewDto, 'pagination'>
    | Pick<PagedListDtoShortCompanyPartnerDto, 'pagination'>;

export const Pagination = ({ pagination }: PaginationProps) => {
    const totalPages = pagination?.totalPages ?? 1;
    const currentPage = pagination?.currentPage ?? 0;

    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (page: number) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('page', (page - 1).toString());
        setSearchParams(newParams);
    };

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
                zIndex: 100,
            }}
        >
            <MPagination
                total={totalPages}
                value={currentPage + 1}
                onChange={handlePageChange}
                mt="md"
            />
        </Flex>
    );
};

export default Pagination;