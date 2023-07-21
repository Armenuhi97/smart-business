import { useCallback, useEffect, useState } from "react";
import { IOrganization } from "../model/organozation.model";
import { getUserOrganizations } from "../slice/organization.slice";
import { useParams } from "react-router-dom";
import { IParams } from "../../../../../../models/params.model";

export function OrganizationProps(query: URLSearchParams, setSearch: any, setPage: any, search: string, dispatch: any, navigate: any, roleParams: any) {
    // const users: IUser[] = useAppSelector((state) => state.allUsers.results);
    // const count: number = useAppSelector((state) => state.allUsers.count);

    const [organizations, setOrganization] = useState<IOrganization[]>([]);
    const [count, setCount] = useState<number>(0);
    const params = useParams();

    useEffect(() => {
        const queryPage = query.get("page");
        const searchValue = query.get("search");
        const currentSearch = searchValue ? searchValue : '';
        setSearch(currentSearch);

        const currentPage = queryPage ? +queryPage : 1;
        setPage(currentPage);

        handleGetOrganizationList(currentPage, true, currentSearch);
    }, [query]);

    const goToUserPage = (user?: IOrganization | boolean) => {
        // navigate(`/dashboard/users/${typeof user === 'boolean' ? 'create' : user?.id}`, { replace: true });
    }


    const handleGetOrganizationList = useCallback((currentPage: number, isSetSearch?: boolean,
        searchValue: string = '') => {

        const paramsObject: IParams = {
            page: currentPage,
            id: +params!.id!
            // query: isSetSearch ? searchValue : search,
            // roleId: roleParams.roleId
        }
        dispatch(getUserOrganizations(paramsObject)).then((data: any) => {
            setOrganization(data.payload.results);
            setCount(data.payload.count);

            // if (!data.payload.company) {
            //     goToVacancyPage();
            // }
        });

    }, [query, search]);
    const deleteOrganization = () => {

    }

    const handlePageClick = useCallback((e: {
        selected: number, isSetSearch?: boolean, searchValue?: string, isSetCategory?: boolean
    }) => {
        navigate({
            pathname: '.',
            search: `?page=${e.selected + 1}&search=${e.isSetSearch ? e.searchValue : search}`,
        });
    }, [search]);

    return {
        organizations,
        count,
        handleGetOrganizationList,
        handlePageClick,
        goToUserPage,
        deleteOrganization
    }
}

export default OrganizationProps;