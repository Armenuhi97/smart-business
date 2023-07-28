import { useCallback, useEffect, useState } from "react";
import { IAccountant } from "../../models/accountant.model";

export function AccountantListProps(query: URLSearchParams, setSearch: any, setPage: any, search: string, dispatch: any, navigate: any, roleParams: any) {
    const [accountant, setAccountant] = useState<IAccountant[]>();
    const [count, setCount] = useState<number>();;
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
            // query: isSetSearch ? searchValue : search,
            // roleId: roleParams.roleId
        }
        // dispatch(getUserById(+params!.id!)).then((data: any) => {
        //     setUser(data.payload.user);
        // });

    }, [query, search]);

    const deleteUser = useCallback((id: number) => {

    }, [])
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