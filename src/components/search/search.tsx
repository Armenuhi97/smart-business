import React, { memo, useCallback, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import * as AiIcons from "react-icons/ai";
import './search.scss';

interface SearchProps {
    search: string;
    onSearch: (value: string) => void;
}
export default memo(function Search({ search, onSearch }: SearchProps) {

    const [searchValue, setSearchValue] = useState<string>(search);
    const [isSearch, setIsSearch] = useState<boolean>(false);

    useEffect(() => {
        setSearchValue(search);
    }, [search])

    useEffect(() => {
        if (search || searchValue) {
            const timer = setTimeout(() => {
                if (!isSearch) {
                    onSearch(searchValue);
                } else {
                    setIsSearch(false);
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [searchValue]);


    const onChangeSearchValue = useCallback((val: string) => {
        setSearchValue(val);
    }, []);

    const handleSubmit = (e: any): void => {
        e.preventDefault();
        setIsSearch(true);
        onSearch(searchValue);
    }
    return (
        <Form style={{ width: '200px' }} className='form-item' onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <div className="input-with-icon-left d-flex align-items-center">
                    <Form.Control as="input" placeholder="Փնտրել" autoComplete="off"
                        type='text'
                        value={searchValue}
                        onChange={(e) => onChangeSearchValue(e.target.value)}

                    ></Form.Control>
                    <div className="input-icon">
                        <AiIcons.AiOutlineSearch />
                    </div>
                </div>
            </Form.Group>
        </Form >
    )
})