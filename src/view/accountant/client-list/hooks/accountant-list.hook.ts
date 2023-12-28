import { useCallback, useEffect, useState } from "react";
import { IAccountant } from "../../models/accountant.model";
import { useAppSelector } from "../../../../hooks";
import { getAllAccountant } from "../../slice/all-accountant.slice";

export function AccountantListProps(query: URLSearchParams, setSearch: any, setPage: any, search: string, dispatch: any, navigate: any, roleParams: any) {
    const accountant: IAccountant[] = useAppSelector((state) => state.allAccountant.results);
    const count: number = useAppSelector((state) => state.allAccountant.count);
    const title = 'Հաշվապահներ';
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

        handleGetAccountantList(currentPage, true, currentSearch);
    }, [query]);

    const goToUserPage = (user?: IAccountant | boolean) => {
        // navigate(`/dashboard/users/${typeof user === 'boolean' ? 'create' : user?.id}`, { replace: true });
        navigate(`/dashboard/users/${typeof user === 'boolean' ? 'create' : 'user/' + user?.id}`);
    }
    const goToViewPage = (id: number) => {
        navigate(`/dashboard/accountant/personal/${id}`);
    }

    const handleGetAccountantList = useCallback((currentPage: number, isSetSearch?: boolean,
        searchValue: string = '') => {

        const params = {
            page: currentPage,
            search: isSetSearch ? searchValue : search
            // query: isSetSearch ? searchValue : search,
            // roleId: roleParams.roleId
        }
        dispatch(getAllAccountant(params));
        // .then((data: any) => {
        //     setUser(data.payload.user);
        // });

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
        accountant,
        count,
        handleGetAccountantList,
        handlePageClick,
        goToUserPage,
        title,
        goToViewPage
    }
}

export default AccountantListProps;