import React from "react";
import './pagination.scss';
import ReactPaginate from "react-paginate";
interface PaginateProps {
    page: number;
    count: number;
    handlePageClick: (e: { selected: number }) => void;
}
function Paginate({ page, handlePageClick, count }: PaginateProps) {
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            forcePage={page - 1}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={count}
            previousLabel="<"
            // renderOnZeroPageCount={null}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active-item"}
        />
    )
}
export default Paginate;