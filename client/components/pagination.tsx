import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

// @ts-ignore
const PaginationU = ({ totalPages, currentPage, onChange }) => {
    const handlePageChange = (pageNumber: number) => {
        onChange(pageNumber);
    };

    return (
        <Pagination>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <Pagination.Item key={pageNumber}
                                 active={currentPage === pageNumber}
                                 onClick={() => handlePageChange(pageNumber)}>
                    {pageNumber}
                </Pagination.Item>
            ))}
        </Pagination>
    );
};

export default PaginationU;