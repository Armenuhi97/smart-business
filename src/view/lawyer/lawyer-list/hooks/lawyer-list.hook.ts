import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks";
import { ILawyer } from "../../models/lawyer.model";
import { getAllLawyer } from "../../slice/all-lawyer.slice";

export function LawyerListProps(query: URLSearchParams, setSearch: any, setPage: any, search: string, dispatch: any, navigate: any, roleParams: any) {
    const lawyers: ILawyer[] = useAppSelector((state) => state.allLawyers.results);
    const count: number = useAppSelector((state) => state.allLawyers.count);

    const title = 'Իրավաբան';
    useEffect(() => {
        document.title = title;
    });

    useEffect(() => {
        const queryPage = query.get("page");
        const searchValue = query.get("search");
        const currentSearch = searchValue ? searchValue : '';
        setSearch(currentSearch);

        const currentPage = queryPage ? +queryPage : 1;
        setPage(currentPage);

        handleGetLawyerList(currentPage, true, currentSearch);
    }, [query]);


    const goToViewPage = (id: number) => {
        navigate(`/dashboard/lawyer/personal/${id}`);
    }

    const handleGetLawyerList = useCallback((currentPage: number, isSetSearch?: boolean,
        searchValue: string = '') => {

        const params = {
            page: currentPage,
            // query: isSetSearch ? searchValue : search,
            // roleId: roleParams.roleId
        }
        dispatch(getAllLawyer(params));

    }, [query, search]);

    const handlePageClick = useCallback((e: {
        selected: number, isSetSearch?: boolean, searchValue?: string, isSetCategory?: boolean
    }) => {
        navigate({
            pathname: '.',
            search: `?page=${e.selected + 1}&search=${e.isSetSearch ? e.searchValue : search}`,
        });
    }, [search]);

    return {
        lawyers,
        count,
        handleGetLawyerList,
        handlePageClick,
        title,
        goToViewPage
    }
}

export default LawyerListProps;