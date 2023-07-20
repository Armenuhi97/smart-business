import React, { useState } from "react";
import Title from "../../../components/title/title";
import { Table } from "react-bootstrap";
import Paginate from "../../../components/pagination/pagination";
import { IUser } from "../models/user.model";
import * as AiIcons from "react-icons/ai";
import UserListProps from "./hooks/client-list.hook";
import ListHook from "../../../utils/hooks/list.hook";
import { pageCount } from "../../../services/API";
import DeleteConfirmModal from '../../../components/delete-confim/delete-confirm.component';
import { deleteUser } from "../slice/client.slice";

function ClientList() {
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
        deleteModalShow
    } = ListHook<IUser>();
    const {
        users,
        count,
        handleGetUserList,
        handlePageClick,
        goToUserPage,
        title
    } = UserListProps(query, setSearch, setPage, search, dispatch, navigate, params);

    return (
        <div>
            <Title title={title} isShowAdd={true} setModalShow={goToUserPage} />

            {!!users?.length && <Table className='mt-2' striped bordered hover>
                <thead>
                    <tr>
                        <th>N</th>
                        <th>Անուն Ազգանուն</th>
                        <th>Հեռախոսահամար</th>
                        <th>Էլ․հասցե</th>
                        <th>Ծննդյան ամսաթիվ</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: IUser, ind: number) => {
                        return (
                            <tr key={user.id}>
                                <td>{(ind + 1) + ((page - 1) * pageCount)}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.email}</td>
                                <td>{user?.birthDate as string}</td>
                                <td><span onClick={() => { goToUserPage(user) }} className='action-btn'><AiIcons.AiOutlineEdit /> </span></td>
                                <td><span onClick={() => handelOpenDeleteConfirmModal(user.id!)} className='action-btn red'><AiIcons.AiOutlineDelete /> </span></td>
                                <td></td>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            }
            {!!users?.length && <Paginate page={page} handlePageClick={handlePageClick} count={Math.ceil(count / pageCount)} />}
            <DeleteConfirmModal
                text='Դուք ցանկանու՞մ եք ջնջել այս հաճախորդին'
                show={deleteModalShow}
                handleClose={handleCloseDeleteModal}
                onSave={() => handleDeleteItem(users, handleGetUserList, handlePageClick, deleteUser)}
            />
        </div>
    )
}
export default ClientList;