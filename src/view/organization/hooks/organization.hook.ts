import { useCallback, useEffect, useState } from "react";
import { IOrganization } from "../model/organozation.model";
import { useParams } from "react-router-dom";
import { getUserOrganizations } from "../slice/organization.slice";
import { IParams } from "../../../models/params.model";

export function OrganizationProps(query: URLSearchParams, setSearch: any, setPage: any, search: string, dispatch: any, navigate: any, params: any) {
    const [organizations, setOrganization] = useState<IOrganization[]>([]);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const queryPage = query.get("page");
        const searchValue = query.get("search");
        const currentSearch = searchValue ? searchValue : '';
        setSearch(currentSearch);

        const currentPage = queryPage ? +queryPage : 1;
        setPage(currentPage);

        handleGetOrganizationList(currentPage, true, currentSearch);
    }, [query]);

    const goToOrganizationPage = (user?: IOrganization | boolean) => {
        // navigate(`/dashboard/users/${typeof user === 'boolean' ? 'create' : user?.id}`, { replace: true });
    }


    const handleGetOrganizationList = useCallback((currentPage: number, isSetSearch?: boolean,
        searchValue: string = '') => {

        const paramsObject: IParams = {
            page: currentPage,
            id: +params!.id!
        }
        // dispatch(getUserOrganizations(paramsObject)).then((data: any) => {
            // setOrganization(data.payload.results);
            // setCount(data.payload.count);
        // });

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
        goToOrganizationPage,
        deleteOrganization
    }
}

export default OrganizationProps;