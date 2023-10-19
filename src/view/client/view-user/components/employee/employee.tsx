import React from "react";
import ListHook from "../../../../../utils/hooks/list.hook";
import { IEmployee } from "./model/employee.model";
import { Table } from "react-bootstrap";
import { pageCount } from "../../../../../services/API";
import Paginate from "../../../../../components/pagination/pagination";
import DeleteConfirmComponent from "../../../../../components/delete-confim/delete-confirm.component";
import Title from "../../../../../components/title/title";
import * as AiIcons from "react-icons/ai";
import EmployeeProps from "./hooks/employee.hook";
import AddEditEmployee from "./component/add-edit-employee";
import { deleteEmployee } from "./slice/employee.slice";

function EmployeeList({ userId }: { userId: number | undefined}) {
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
    } = ListHook<IEmployee>();
    const {
        employees,
        count,
        handleGetEmployeeList,
        handlePageClick        
    } = EmployeeProps(query, setSearch, setPage, search, dispatch, navigate,params);

    return (
        <div>
            <Title title='Աշխատակիցներ' isShowAdd={false} setModalShow={setModalShow} />

            {!!employees?.length && <Table className='mt-2' striped bordered hover>
                <thead>
                    <tr>
                        <th>N</th>
                        <th>ԱՆուն</th>
                        <th>Ազգանուն</th>
                        <th>Էլ․ հասցե</th>
                        <th>Հեռ․</th>
                        <th></th>
                        <th></th>
                        {/* <th></th>
                        <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee: IEmployee, ind: number) => {
                        return (
                            <tr key={employee.id}>
                                <td>{(ind + 1) + ((page - 1) * pageCount)}</td>
                                <td>{employee.name}</td>
                                <td>{employee.surname}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phoneNumber}</td>
                                <td><div onClick={() => { openModalForEditItem(employee) }} className='action-btn'><AiIcons.AiOutlineEdit /> </div></td>

                                <td><span onClick={() => handelOpenDeleteConfirmModal(employee.id!)} className='action-btn red'><AiIcons.AiOutlineDelete /> </span></td>

                                {/* <td><span onClick={() => { goToUserPage(user) }} className='action-btn'><AiIcons.AiOutlineEdit /> </span></td>
                                <td><span onClick={() => handelOpenDeleteConfirmModal(user.id!)} className='action-btn red'><AiIcons.AiOutlineDelete /> </span></td> */}

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            }
            {!!employees?.length && <Paginate page={page} handlePageClick={handlePageClick} count={Math.ceil(count / pageCount)} />}
            <DeleteConfirmComponent
                show={deleteModalShow}
                handleClose={handleCloseDeleteModal}
                onSave={() => handleDeleteItem(employees, handleGetEmployeeList, handlePageClick, deleteEmployee)}
            />
            <AddEditEmployee
                editItem={editItem}
                show={modalShow}
                onHide={handleClose}
                onSave={(evt: any) => handleSave(evt, handleGetEmployeeList, handlePageClick)}
            />
        </div>
    )
}
export default EmployeeList;