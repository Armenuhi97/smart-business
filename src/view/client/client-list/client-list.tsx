import React, { useState } from "react";
import Title from "../../../components/title/title";
import { Table } from "react-bootstrap";
import Paginate from "../../../components/pagination/pagination";
import { IUser, UserDetail } from "../models/user.model";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import UserListProps from "./hooks/client-list.hook";
import ListHook from "../../../utils/hooks/list.hook";
import { pageCount } from "../../../services/API";
import DeleteConfirmModal from '../../../components/delete-confim/delete-confirm.component';
import { deleteUser, modifyUser } from "../slice/client.slice";
import { isDeletedAction } from "../slice/all-clients.slice";

function ClientList({ type }: { type: string }) {
    const {
        page,
        setPage,
        query,
        search,
        setSearch,
        navigate,
        dispatch,
        params,
        handelOpenDeleteConfirmModal,
        handleCloseDeleteModal,
        handleDeleteItem,
        deleteModalShow,
        deleteRestoreUser,
        isDeleted, deleteItemId
    } = ListHook<UserDetail>();
    const {
        users,
        changeIsDeletedKey,
        count,
        handleGetUserList,
        handlePageClick,
        goToUserPage,
        title,
        goToViewPage
    } = UserListProps(query, setSearch, setPage, search, dispatch, navigate, params, type);

    return (
        <div>
            <Title title={title} isShowAdd={true} handlePageClick={handlePageClick} search={search} isSearch={!type ? true : false} setModalShow={goToUserPage} />

            {!!users?.length && <Table className='mt-2' striped bordered hover>
                <thead>
                    <tr>
                        <th>N</th>
                        <th>Անուն Ազգանուն</th>
                        <th>Հեռախոսահամար</th>
                        <th>Էլ․հասցե</th>
                        {/* <th>Ծննդյան ամսաթիվ</th> */}
                        <th>Մենեջերների քանակ</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: UserDetail, ind: number) => {
                        return (
                            <tr key={user.id}>
                                <td>{(ind + 1) + ((page - 1) * pageCount)}</td>
                                <td>{user.user.first_name} {user.user.last_name}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.user.email}</td>
                                <td>{user?.manager_count}</td>
                                <td><span onClick={() => { goToUserPage(user) }} className='action-btn'><AiIcons.AiOutlineEdit /> </span></td>
                                <td>
                                    <span onClick={() => {
                                        handelOpenDeleteConfirmModal(user.id!, user.is_deleted);
                                    }} className='action-btn red'>
                                        {user.is_deleted ? <FaIcons.FaTrashRestore /> : <AiIcons.AiOutlineDelete />} </span>
                                </td>
                                <td><span onClick={() => { goToViewPage(user.id!) }} className='action-btn'><AiIcons.AiOutlineEye /> </span></td>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            }
            {!!users?.length && <Paginate page={page} handlePageClick={handlePageClick} count={Math.ceil(count! / pageCount)} />}
            {/*  */}
            <DeleteConfirmModal
                text={`Դուք ցանկանու՞մ եք ${isDeleted?'վերականգնել':'ջնջել'} այս հաճախորդին`}
                show={deleteModalShow}
                handleClose={handleCloseDeleteModal}
                onSave={() => {
                    changeIsDeletedKey(+deleteItemId!, !isDeleted);
                    deleteRestoreUser(modifyUser);
                }}
            />
        </div>
    )
}
export default ClientList;