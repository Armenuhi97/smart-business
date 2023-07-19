import React, { useState } from "react";
import Title from "../../../components/title/title";
import { Table } from "react-bootstrap";
import Paginate from "../../../components/pagination/pagination";
import { IUser } from "../models/user.model";
import * as AiIcons from "react-icons/ai";

function ClientList() {
    const goToUserPage = (user?: IUser | boolean) => {

    }
    const users: IUser[] = [];
    const pageCount: number = 10;
    const page: number = 1;
    const count: number = 0;
    const handlePageClick = () => {

    }
    return (
        <div>
            <Title title={'Հաճախորդներ'} isShowAdd={true} addTitle={'Ավելացնել'} setModalShow={goToUserPage} />

            {!!users?.length && <Table className='mt-2' striped bordered hover>
                <thead>
                    <tr>
                        <th>N</th>
                        <th>Անուն Ազգանուն</th>
                        <th>Հեռախոսահամար</th>
                        <th>Էլ․հասցե</th>
                        <th>Ծննդյան թիվ</th>
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
                                <td>{user?.birthDate}</td>
                                <td><span onClick={() => { goToUserPage(user) }} className='action-btn'><AiIcons.AiOutlineEdit /> </span></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            }
            {!!users?.length && <Paginate page={page} handlePageClick={handlePageClick} count={Math.ceil(count / pageCount)} />}
        </div>
    )
}
export default ClientList;