import { useCallback, useEffect, } from "react";
import { IInvite } from "../models/invite.model";
import { useAppSelector } from "../../../hooks";
import { getAllInvites } from "../slice/invite.slice";

export function InviteListProps(query: URLSearchParams, setSearch: any, setPage: any, search: string, dispatch: any, navigate: any, roleParams: any) {
    const invites: IInvite[] = useAppSelector((state) => state.allInvites.results);
    const count: number = useAppSelector((state) => state.allInvites.count);

    const title = 'Ջնջելու հայտեր';
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

        handleGetInvitesList(currentPage, true, currentSearch);
    }, [query]);


    const handleGetInvitesList = useCallback((currentPage: number, isSetSearch?: boolean,
        searchValue: string = '') => {

        const params = {
            page: currentPage,
            // query: isSetSearch ? searchValue : search,
            // roleId: roleParams.roleId
        }
        dispatch(getAllInvites(params))

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
        invites,
        count,
        handleGetInvitesList,
        handlePageClick,
        title
    }
}

export default InviteListProps;