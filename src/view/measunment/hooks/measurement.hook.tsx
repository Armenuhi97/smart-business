import { useCallback, useEffect, useState } from "react";
import { IParams } from "../../../models/params.model";
import { IMeasurement } from "../model/measurement.model";
import { getMeasurement } from "../slice/measurement.slice";

export function MeasurementProps(query: URLSearchParams, setSearch: any, setPage: any, search: string, dispatch: any, navigate: any, params: any) {
    const [measurements, setMeasurement] = useState<IMeasurement[]>([]);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const queryPage = query.get("page");
        const searchValue = query.get("search");
        const currentSearch = searchValue ? searchValue : '';
        setSearch(currentSearch);

        const currentPage = queryPage ? +queryPage : 1;
        setPage(currentPage);

        handleGetMeasurementList(currentPage, true, currentSearch);
    }, [query]);

    const handleGetMeasurementList = useCallback((currentPage: number, isSetSearch?: boolean,
        searchValue: string = '') => {

        const paramsObject: IParams = {
            page: currentPage,
            id: +params!.id!
        }
        dispatch(getMeasurement(paramsObject)).then((data: any) => {
            setMeasurement(data.payload);
            // setCount(data.payload.length);
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
        measurements,
        count,
        handleGetMeasurementList,
        handlePageClick
    }
}

export default MeasurementProps;