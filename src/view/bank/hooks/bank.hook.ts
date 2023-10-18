import { useCallback, useEffect, useState } from "react";
import { IParams } from "../../../models/params.model";
import { IBank } from "../model/bank.model";
import { getBank } from "../slice/bank.slice";

export function BankProps(query: URLSearchParams, setSearch: any, setPage: any, search: string, dispatch: any, navigate: any, params: any) {
    const [banks, setBank] = useState<IBank[]>([]);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const queryPage = query.get("page");
        const searchValue = query.get("search");
        const currentSearch = searchValue ? searchValue : '';
        setSearch(currentSearch);

        const currentPage = queryPage ? +queryPage : 1;
        setPage(currentPage);

        handleGetBankList(currentPage, true, currentSearch);
    }, [query]);

    const handleGetBankList = useCallback((currentPage: number, isSetSearch?: boolean,
        searchValue: string = '') => {

        const paramsObject: IParams = {
            page: currentPage,
            id: +params!.id!
        }
        dispatch(getBank(paramsObject)).then((data: any) => {
            setBank(data.payload);
            setCount(data.payload.length);
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
        banks,
        count,
        handleGetBankList,
        handlePageClick
    }
}

export default BankProps;