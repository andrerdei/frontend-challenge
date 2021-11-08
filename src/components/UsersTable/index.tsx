import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {makeStyles, Theme} from '@material-ui/core'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import {Edit, Delete, Clear} from '@material-ui/icons'
import {User} from "../../interfaces/User";
import {DeleteModal} from "../DeleteModal";
import {ActionButton} from "../ActionButton";
import {nameToUppercase} from "../../utils/captilizedName";
import {CreateModal} from "../CreateModal";

const tableStyles = makeStyles(
    (theme: Theme) => (
        {
            table: {
                marginTop: 20
            },
            cellHead: {
                fontSize: 16,
                fontWeight: 700
            },
            cellBody: {
                fontSize: 16,
                fontWeight: 400
            },
            modal: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
        }
    )
);

type ListUserProps = {
    users: User[]
};

export function UsersTable({users}: ListUserProps) {
    const [newUsers, setNewUsers] = useState<User[]>([]);
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
    const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
    const [userId, setUserId] = useState(0);
    const tableClasses = tableStyles();

    function openCreateModal() {
        setIsCreateModalOpened(true);
    }

    function closeCreateModal() {
        setIsCreateModalOpened(false);
    }

    function openDeleteModal(id: number) {
        setUserId(id);
        setIsDeleteModalOpened(true);
    }

    function closeDeleteModal() {
        setIsDeleteModalOpened(false);
    }

    function createUser(id: number) {
        const currentUsers = newUsers.filter((listUser) => listUser.id !== id)
        setNewUsers(currentUsers);
        setIsDeleteModalOpened(false);
    }

    function deleteSelectedUser(id: number) {
        const currentUsers = newUsers.filter((listUser) => listUser.id !== id)
        setNewUsers(currentUsers);
        setIsDeleteModalOpened(false);
    }

    useEffect(() => {
        setNewUsers(users);
    }, [users]);

    return (
        <>
            <CreateModal
                opened={isCreateModalOpened}
                title='Registrar Usuário'
                onClose={closeCreateModal}
            >
                <ActionButton
                    type='primary'
                    text={nameToUppercase('registrar')}
                    size={120}
                    icon={<Delete style={{color: '#FFF', marginRight: 8}}/>}
                    onClick={() => createUser(userId)}
                />

                <ActionButton
                    type="secondary"
                    text={nameToUppercase('cancelar')}
                    bordered
                    size={130}
                    icon={<Clear style={{color: '#424242', marginRight: 8}}/>}
                    onClick={() => closeCreateModal()}
                />
            </CreateModal>

            <DeleteModal
                opened={isDeleteModalOpened}
                title='Remover Usuário'
                onClose={closeDeleteModal}
            >
                <ActionButton
                    type='primary'
                    text={nameToUppercase('excluir')}
                    size={120}
                    icon={<Delete style={{color: '#FFF', marginRight: 8}}/>}
                    onClick={() => deleteSelectedUser(userId)}
                />

                <ActionButton
                    type="secondary"
                    text={nameToUppercase('cancelar')}
                    bordered
                    size={130}
                    icon={<Clear style={{color: '#424242', marginRight: 8}}/>}
                    onClick={() => closeDeleteModal()}
                />
            </DeleteModal>

            <Table
                className={tableClasses.table}
                aria-label="customized table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell align="left" className={tableClasses.cellHead}>
                            Nome do usuário
                        </TableCell>
                        <TableCell align="left" className={tableClasses.cellHead}>
                            E-mail
                        </TableCell>
                        <TableCell align="left" className={tableClasses.cellHead}>
                            Ações
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {newUsers.map(
                        (listUser) => (
                            <TableRow key={listUser.id}>
                                <TableCell  align="left" className={tableClasses.cellBody}>
                                    {listUser.first_name} {listUser.last_name}
                                </TableCell>
                                <TableCell  align="left" className={tableClasses.cellBody}>
                                    {listUser.email}
                                </TableCell>
                                <TableCell  align="left" className={tableClasses.cellBody}>
                                    <div>
                                        <Link to={`/users/${listUser.id}`}>
                                            <ActionButton
                                                type='primary'
                                                text={nameToUppercase('editar')}
                                                size={120}
                                                icon={<Edit style={{color: '#FFF', marginRight: 8}}/>}
                                            />
                                        </Link>
                                        <ActionButton
                                            type='primary'
                                            text={nameToUppercase('excluir')}
                                            size={120}
                                            icon={<Delete style={{color: '#FFF', marginRight: 8}}/>}
                                            onClick={() => openDeleteModal(listUser.id)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </>
    );
}
