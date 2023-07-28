import { useCallback, useEffect, useState } from "react";
import { IBroker } from "../../models/broker.model";
import { useAppSelector } from "../../../../hooks";

export function BrokerListProps(query: URLSearchParams, setSearch: any, setPage: any, search: string, dispatch: any, navigate: any, roleParams: any) {
    const brokers: IBroker[] = useAppSelector((state) => state.allBrokers.results);
    const count: number = useAppSelector((state) => state.allBrokers.count);

    const title = 'Բրոքեր';
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

        handleGetBrokerList(currentPage, true, currentSearch);
    }, [query]);


    const goToViewPage = (id: number) => {
        navigate(`/dashboard/broker/personal/${id}`);
    }

    const handleGetBrokerList = useCallback((currentPage: number, isSetSearch?: boolean,
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

    const handlePageClick = useCallback((e: {
        selected: number, isSetSearch?: boolean, searchValue?: string, isSetCategory?: boolean
    }) => {
        navigate({
            pathname: '.',
            search: `?page=${e.selected + 1}&search=${e.isSetSearch ? e.searchValue : search}`,
        });
    }, [search]);

    return {
        brokers,
        count,
        handleGetBrokerList,
        handlePageClick,
        title,
        goToViewPage
    }
}

export default BrokerListProps;