import React, { useState } from "react";
import Title from "../../../components/title/title";
import { Table } from "react-bootstrap";
import Paginate from "../../../components/pagination/pagination";
import { IAccountant } from "../models/accountant.model";
import * as AiIcons from "react-icons/ai";
import { AccountantListProps } from "./hooks/accountant-list.hook";
import ListHook from "../../../utils/hooks/list.hook";
import { pageCount } from "../../../services/API";
import DeleteConfirmModal from '../../../components/delete-confim/delete-confirm.component';
import { deleteAccountant } from "../slice/accountant.slice";
import AddEditAccountant from "../add-edit-client/add-edit-accountant";

function AccountantList() {
    const {
        page,
        setPage,
        query,
        search,
        setSearch,
        navigate,
        dispatch,
        params,
        editItem,
        modalShow,
        handleClose,
        handelOpenDeleteConfirmModal,
        handleCloseDeleteModal,
        handleDeleteItem,
        deleteModalShow,
        handleSave,
        setModalShow,
        openModalForEditItem
    } = ListHook<IAccountant>();
    const {
        accountant,
        count,
        handleGetAccountantList,
        handlePageClick,
        title,
        goToViewPage
    } = AccountantListProps(query, setSearch, setPage, search, dispatch, navigate, params);

    return (
        <div>
            <Title title={title} isShowAdd={true} setModalShow={setModalShow} />

            {!!accountant?.length && <Table className='mt-2' striped bordered hover>
                <thead>
                    <tr>
                        <th>N</th>
                        <th>Կազմակերպություն</th>
                        <th>ՀՎՀՀ</th>
                        <th>Էլ․հասցե</th>
                        <th>Հեռ․</th>
                        <th>հաճախորդների քանակ</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {accountant.map((user: IAccountant, ind: number) => {
                        return (
                            <tr key={user.id}>
                                <td>{(ind + 1) + ((page - 1) * pageCount)}</td>
                                <td>{user.company_name}</td>
                                <td>{user.tin}</td>
                                <td>{user.email}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.user_count}</td>
                                <td><span onClick={() => { openModalForEditItem(user) }} className='action-btn'><AiIcons.AiOutlineEdit /> </span></td>
                                <td><span onClick={() => handelOpenDeleteConfirmModal(user.id!)} className='action-btn red'><AiIcons.AiOutlineDelete /> </span></td>
                                <td><span onClick={() => { goToViewPage(user.id!) }} className='action-btn'><AiIcons.AiOutlineEye /> </span></td>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            }
            {!!accountant?.length && <Paginate page={page} handlePageClick={handlePageClick} count={Math.ceil(count! / pageCount)} />}
            {<DeleteConfirmModal
                text='Դուք ցանկանու՞մ եք ջնջել այս հաշվապահին'
                show={deleteModalShow}
                handleClose={handleCloseDeleteModal}
                onSave={() => handleDeleteItem(accountant!, handleGetAccountantList, handlePageClick, deleteAccountant)}
            />}
            <AddEditAccountant
                editItem={editItem}
                show={modalShow}
                onHide={handleClose}
                onSave={(evt: any) => handleSave(evt, handleGetAccountantList, handlePageClick)}
            />
        </div>
    )
}
export default AccountantList;