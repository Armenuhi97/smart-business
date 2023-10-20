import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IParams, WithClientId } from "../../../../../../models/params.model";
import { IEmployee } from "../model/employee.model";
import { getUserEmployees } from "../slice/employee.slice";

export function EmployeeProps(query: URLSearchParams, setSearch: any, setPage: any, search: string, dispatch: any, navigate: any, params: any, isUser = false) {
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const queryPage = query.get("page");
        const searchValue = query.get("search");
        const currentSearch = searchValue ? searchValue : '';
        setSearch(currentSearch);

        const currentPage = queryPage ? +queryPage : 1;
        setPage(currentPage);

        handleGetEmployeeList(currentPage, true, currentSearch);
    }, [query]);


    const handleGetEmployeeList = useCallback((currentPage: number, isSetSearch?: boolean,
        searchValue: string = '') => {

        const paramsObject: WithClientId = {
            page: currentPage,
            clientId: isUser ? params!.id! : ''
        }
        dispatch(getUserEmployees(paramsObject)).then((data: any) => {
            setEmployees(data.payload.results);
            setCount(data.payload.count);
        });

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
        employees,
        count,
        handleGetEmployeeList,
        handlePageClick
    }
}

export default EmployeeProps;