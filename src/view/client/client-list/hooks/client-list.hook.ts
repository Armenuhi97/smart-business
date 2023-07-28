import { useCallback, useEffect } from "react";
import { useAppSelector } from "../../../../hooks";
import { IUser } from "../../models/user.model";
import { getAllUsers } from "../../slice/all-clients.slice";

export function UserListProps(query: URLSearchParams, setSearch: any, setPage: any, search: string, dispatch: any, navigate: any, params:any) {
    const users: IUser[] = useAppSelector((state) => state.allUsers.results);
    const count: number = useAppSelector((state) => state.allUsers.count);

    const title = 'Հաճախորդներ';
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

        handleGetUserList(currentPage, true, currentSearch);
    }, [query]);

    const goToUserPage = (user?: IUser | boolean) => {
        // navigate(`/dashboard/users/${typeof user === 'boolean' ? 'create' : user?.id}`, { replace: true });
        navigate(`/dashboard/users/${typeof user === 'boolean' ? 'create' : 'user/' + user?.id}`);
    }
    const goToViewPage = (id: number) => {
        navigate(`/dashboard/users/personal/${id}`);
    }

    const handleGetUserList = useCallback((currentPage: number, isSetSearch?: boolean,
        searchValue: string = '') => {

        const params = {
            page: currentPage,
            // query: isSetSearch ? searchValue : search,
            // roleId: roleParams.roleId
        }
        // dispatch(getAllUsers({
        //     ...params
        // }))

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
        users,
        count,
        handleGetUserList,
        handlePageClick,
        goToUserPage,
        title,
        goToViewPage
    }
}

export default UserListProps;