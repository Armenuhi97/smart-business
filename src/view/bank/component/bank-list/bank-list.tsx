import React from "react";
import { Table } from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import BankProps from "../../hooks/bank.hook";
import Title from "../../../../components/title/title";
import { IBank } from "../../model/bank.model";
import { pageCount } from "../../../../services/API";
import Paginate from "../../../../components/pagination/pagination";
import DeleteConfirmComponent from "../../../../components/delete-confim/delete-confirm.component";
import AddEditBank from "../add-edit-bank";
import ListHook from "../../../../utils/hooks/list.hook";
import { deleteBank } from "../../slice/bank.slice";


function BankList() {
    const {
        page,
        setPage,
        query,
        search,
        setSearch,
        navigate,
        dispatch,
        params,
        modalShow,
        editItem,
        handelOpenDeleteConfirmModal,
        handleCloseDeleteModal,
        handleDeleteItem,
        handleClose,
        handleSave, setModalShow,
        openModalForEditItem,
        deleteModalShow
    } = ListHook<IBank>();
    const {
        banks,
        count,
        handleGetBankList,
        handlePageClick,
    } = BankProps(query, setSearch, setPage, search, dispatch, navigate, params);

    return (
        <div>
            <Title title='Բանկեր' isShowAdd={true} setModalShow={setModalShow} />

            {!!banks?.length && <Table className='mt-2' striped bordered hover>
                <thead>
                    <tr>
                        <th>N</th>
                        <th>ԱՆուն</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {banks.map((bank: IBank, ind: number) => {
                        return (
                            <tr key={bank.id}>
                                <td>{(ind + 1) + ((page - 1) * pageCount)}</td>
                                <td>{bank.name}</td>
                                <td><div onClick={() => { openModalForEditItem(bank) }} className='action-btn'><AiIcons.AiOutlineEdit /> </div></td>
                                <td><span onClick={() => handelOpenDeleteConfirmModal(bank.id!)} className='action-btn red'><AiIcons.AiOutlineDelete /> </span></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            }
            {!!banks?.length && <Paginate page={page} handlePageClick={handlePageClick} count={Math.ceil(count / pageCount)} />}
            <DeleteConfirmComponent
                show={deleteModalShow}
                handleClose={handleCloseDeleteModal}
                onSave={() => handleDeleteItem(banks, handleGetBankList, handlePageClick, deleteBank)}
            />
            {/* onSave={() => handleDeleteItem(currencies, handleGetCurrencyList, handlePageClick, deleteCurrency)} */}
            <AddEditBank
                editItem={editItem}
                show={modalShow}
                onHide={handleClose}
                onSave={(evt: any) => handleSave(evt, handleGetBankList, handlePageClick)}
            />
        </div>
    )
}
export default BankList;