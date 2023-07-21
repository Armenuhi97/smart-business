import React, { useState } from "react";
import ListHook from "../../../../../utils/hooks/list.hook";
import { IOrganization } from "./model/organozation.model";
import { getUserOrganizations } from "./slice/organization.slice";
import OrganizationProps from "./hooks/organization.hook";
import { Table } from "react-bootstrap";
import { pageCount } from "../../../../../services/API";
import Paginate from "../../../../../components/pagination/pagination";
import DeleteConfirmComponent from "../../../../../components/delete-confim/delete-confirm.component";


function OrganizationList() {
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
    } = ListHook<IOrganization>();
    const {
        organizations,
        count,
        handleGetOrganizationList,
        handlePageClick,
        goToUserPage,
        deleteOrganization
    } = OrganizationProps(query, setSearch, setPage, search, dispatch, navigate, params);

    return (
        <div>

            {!!organizations?.length && <Table className='mt-2' striped bordered hover>
                <thead>
                    <tr>
                        <th>N</th>
                       
                        <th></th>
                        {/* <th></th>
                        <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {organizations.map((organization: IOrganization, ind: number) => {
                        return (
                            <tr key={organization.id}>
                                <td>{(ind + 1) + ((page - 1) * pageCount)}</td>
                               
                                {/* <td><span onClick={() => { goToUserPage(user) }} className='action-btn'><AiIcons.AiOutlineEdit /> </span></td>
                                <td><span onClick={() => handelOpenDeleteConfirmModal(user.id!)} className='action-btn red'><AiIcons.AiOutlineDelete /> </span></td> */}

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            }
            {!!organizations?.length && <Paginate page={page} handlePageClick={handlePageClick} count={Math.ceil(count / pageCount)} />}
            <DeleteConfirmComponent
                show={deleteModalShow}
                handleClose={handleCloseDeleteModal}
                onSave={() => handleDeleteItem(organizations, handleGetOrganizationList, handlePageClick, deleteOrganization)}
            />
        </div>
    )
}
export default OrganizationList;