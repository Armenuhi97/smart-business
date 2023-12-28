import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks";
import { IUser, UserDetail } from "../../models/user.model";
import { getAllUsers, getMyClients } from "../../slice/all-clients.slice";
import { ParamsWithId } from "../../../../models/params.model";

export function UserListProps(query: URLSearchParams, setSearch: any, setPage: any, search: string, dispatch: any, navigate: any, params: any, type: string) {
    // const users: UserDetail[] = useAppSelector((state) => state.allUsers.results);
    // const count: number = useAppSelector((state) => state.allUsers.count);
    const [users, setUsers] = useState<UserDetail[]>();
    const [count, setСount] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    const title = 'Հաճախորդներ';
    useEffect(() => {
        document.title = title;
    });

    useEffect(() => {
        const queryPage = query.get("page");
        const searchValue = query.get("search");
        const currentSearch = searchValue ? searchValue : '';
        setSearch(currentSearch);

        const currentPage = type ? pageNumber : queryPage ? +queryPage : 1;
        setPage(currentPage);

        handleGetUserList(currentPage, true, currentSearch);
    }, [query, pageNumber]);

    const goToUserPage = (user?: UserDetail | boolean) => {
        // navigate(`/dashboard/users/${typeof user === 'boolean' ? 'create' : user?.id}`, { replace: true });
        navigate(`/dashboard/users/${typeof user === 'boolean' ? 'create' : 'user/' + user?.id}`);
    }
    const goToViewPage = (id: number) => {
        navigate(`/dashboard/users/personal/${id}`);
    }

    const handleGetUserList = useCallback((currentPage: number, isSetSearch?: boolean,
        searchValue: string = '') => {
        let reqParams: ParamsWithId = {
            page: currentPage,
            search: isSetSearch ? searchValue : search,
            // roleId: roleParams.roleId
        }
        let request;
        if (type) {
            reqParams = {
                ...reqParams,
                [type]: params.id!
            }
            request = getMyClients(reqParams);
        } else {
            request = getAllUsers(reqParams);
        }
        dispatch(request).then((data: any) => {
            if (type === 'acc_id') {
                setUsers(data.payload);
            } else {
                setUsers(data.payload?.results);
                setСount(data.payload?.count);
            }
        })

    }, [query, search, pageNumber]);


    const handlePageClick = useCallback((e: {
        selected: number, isSetSearch?: boolean, searchValue?: string, isSetCategory?: boolean
    }) => {
        const page = e.selected + 1;
        if (!type) {
            navigate({
                pathname: '.',
                search: `?page=${page}&search=${e.isSetSearch ? e.searchValue : search}`,
            });
        } else {
            setPageNumber(page);
            // setSearch(search);
        }
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