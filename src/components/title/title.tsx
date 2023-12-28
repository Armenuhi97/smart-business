import React from "react";
import { Button } from "react-bootstrap";
import Search from "../search/search";
import useQuery from "../../utils/use-query.params";
interface TitleProps {
    title: string;
    setModalShow?: (evt: boolean) => void;
    addTitle?: string;
    isShowAdd?: boolean;
    search?: string;
    handlePageClick?: any;
    isSearch?: boolean;
}
function Title({ title, setModalShow, addTitle, isShowAdd = true, search, handlePageClick,isSearch }: TitleProps) {

    return (
        <div>
            <div className={(!isShowAdd ? 'justify-content-center' : 'justify-content-between') + ' d-flex align-items-center'} >
                <h1>{title}</h1>
                {isShowAdd && <Button variant="primary" onClick={() => setModalShow!(true)}>
                    {addTitle ? addTitle : 'Ավելացնել'}
                </Button>}
            </div>
            {isSearch && <Search search={search || ''} onSearch={(e) =>handlePageClick({ selected: 0, isSetSearch: true, searchValue: e })} />}
        </div>
    )
}
export default Title;