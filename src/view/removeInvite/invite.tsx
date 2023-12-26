import React, { useState } from "react";
import { IInvite, InviteStatus } from "./models/invite.model";
import ListHook from "../../utils/hooks/list.hook";
import Title from "../../components/title/title";
import { Table } from "react-bootstrap";
import { pageCount } from "../../services/API";
import Paginate from "../../components/pagination/pagination";
import InviteListProps from "./hooks/invite.hook";
import * as AiIcons from "react-icons/ai";
import RemoveInvite from "./components/removeInvite";


function InviteList() {
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
    } = ListHook<IInvite>();
    const {
        invites,
        count,
        handleGetInvitesList,
        handlePageClick,
        title
    } = InviteListProps(query, setSearch, setPage, search, dispatch, navigate, params);
    return (
        <div>
            <Title title={title} isShowAdd={true} setModalShow={setModalShow} />

            {!!invites?.length && <Table className='mt-2' striped bordered hover>
                <thead>
                    <tr>
                        <th>N</th>
                        <th>Անուն</th>
                        <th>Ազգանուն</th>
                        <th>Հեռ․</th>
                        <th>Էլ․հասցե</th>
                        <th>Տեսակ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {invites.map((invite: IInvite, ind: number) => {
                        return (
                            <tr key={invite.id}>
                                <td>{(ind + 1) + ((page - 1) * pageCount)}</td>
                                <td>{invite.user.user.first_name}</td>
                                <td>{invite.user.user.last_name}</td>
                                <td>{invite.user.phone_number}</td>
                                <td>{invite.user?.user.email}</td>
                                <td>{InviteStatus[invite.type]}</td>
                                <td>{invite.type === 'new' && <span onClick={() => { openModalForEditItem(invite) }} className='action-btn'><AiIcons.AiOutlineEdit /> </span>}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            }
            {!!invites?.length && <Paginate page={page} handlePageClick={handlePageClick} count={Math.ceil(count! / pageCount)} />}
            <RemoveInvite editItem={editItem}
                show={modalShow}
                onHide={handleClose}
                onSave={() => {
                    handleClose();
                    handleGetInvitesList(page);
                }}
            />
            {/* <AddEditBroker
                editItem={editItem}
                show={modalShow}
                onHide={handleClose}
                onSave={(evt: any) => handleSave(evt, handleGetBrokerList, handlePageClick)}
            /> */}
        </div>
    )
}
export default InviteList;