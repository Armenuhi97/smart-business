import { useCallback, useEffect, useState } from "react";
import { IOrganization } from "../model/organozation.model";
import { useParams } from "react-router-dom";
import { getUserOrganizations } from "../slice/organization.slice";
import { IParams, ParamsWithId } from "../../../models/params.model";
import { getClientCompany } from "../../client/slice/client.slice";

export function OrganizationProps(query: URLSearchParams, setSearch: any, setPage: any,
    search: string, dispatch: any, navigate: any, params: any, type: string) {
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

    const handleGetOrganizationList = useCallback((currentPage: number, isSetSearch?: boolean, searchValue: string = '') => {
        let paramsObject: ParamsWithId = {
            page: currentPage
        }
        paramsObject = {
            ...paramsObject,
            [type ? type : 'all']: params.id || 'true'
        }

        // const request = userId ? getClientCompany(userId) : getUserOrganizations(paramsObject);
        dispatch(getUserOrganizations(paramsObject)).then((data: any) => {
            if (type === 'acc_id') {
                setOrganization(data.payload.results);
                setCount(data.payload.count);
            } else {
                setOrganization(data.payload);
            }
        });

    }, [query, search, params]);

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
        handlePageClick
    }
}

export default OrganizationProps;