import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {makeStyles, TextField, Theme, withStyles} from '@material-ui/core'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import {Edit, Delete, Clear, PersonAdd} from '@material-ui/icons'
import {User} from "../../interfaces/User";
import {DeleteModal} from "../DeleteModal";
import {ActionButton} from "../ActionButton";
import {nameToUppercase} from "../../utils/formatStrings";
import {CreateModal} from "../CreateModal";
import {CreateModalContent, MainTable} from "./styles";
import * as usersListService from "../../services/usersList";
import {GenericToast} from "../GenericToast";
import {NewUser} from "../../interfaces/newUser";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

const tableStyles = makeStyles(
    (theme: Theme) => (
        {
            table: {
                marginTop: 20,
            },
            cellHead: {
                fontSize: 16,
                fontWeight: 700
            },
            cellBody: {
                fontSize: 16,
                fontWeight: 400,
            },
            modal: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
        }
    )
);

const CssTextField = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,

        '&': {
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
        },
        '& label.Mui-focused': {
            color: '#000',
            fontWeight: 'bold',
        },
        '& .MuiInput-underline:after': {
            borderColor: '#C4C4C4',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#C4C4C4',
            },
            '&:hover fieldset': {
                borderColor: '#C4C4C4',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#C4C4C4',
            },
        },
    },
})(TextField);

type ListUserProps = {
    users: User[]
};

export function UsersTable({users}: ListUserProps) {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const [newUser, setNewUser] = useState<NewUser>({
        first_name: '',
        last_name: '',
        email: '',
    });
    const [isSaved, setIsSaved] = useState(false);
    const [displayError, setDisplayError] = useState(false);
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
        setNewUser({
            first_name: '',
            last_name: '',
            email: '',
        });
    }

    function openDeleteModal(id: number) {
        setUserId(id);
        setIsDeleteModalOpened(true);
    }

    function closeDeleteModal() {
        setIsDeleteModalOpened(false);
    }

    function createUser() {
        if (!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.email.includes('@')) {
            setDisplayError(true);
            return;
        }

        try {
            return usersListService.createUser(`/users`, newUser).then(() => {
                // const currentUsers = newUsers.filter((listUser) => listUser.id !== id)
                // setNewUsers(currentUsers);
                setIsSaved(true);
            });

        } catch {
            setDisplayError(true);
        }
    }

    function deleteSelectedUser(id: number) {
        const endpoint = `/users/${id}`
        return usersListService.deleteUser(endpoint).then(() => {
            const currentUsers = newUsers.filter((listUser) => listUser.id !== id)
            setNewUsers(currentUsers);
            setIsDeleteModalOpened(false);
        });
    }

    useEffect(() => {
        setNewUsers(users);
    }, [users]);

    return (
        <>
            {/*<div className="sweet-loading">*/}
            {/*    <ClipLoader color={color} loading={loading} css={override} size={150} />*/}
            {/*</div>*/}

            <CreateModal
                opened={isCreateModalOpened}
                title='Registrar Usuário'
                onClose={closeCreateModal}
            >
                <CreateModalContent>
                    <div className="inputGroupCreate">
                        <CssTextField
                            label="Primeiro nome"
                            placeholder="Informe o seu primeiro nome"
                            variant="outlined"
                            value={newUser?.first_name}
                            onChange={e => setNewUser({...newUser, first_name: e.target.value})}
                            error={newUser?.first_name === ""}
                            helperText={newUser?.first_name === "" ? 'Campo obrigatório' : ' '}
                        />
                        <CssTextField
                            label="Último nome"
                            placeholder="Informe o seu ultimo nome"
                            variant="outlined"
                            value={newUser?.last_name}
                            onChange={e => setNewUser({...newUser, last_name: e.target.value})}
                            error={newUser?.last_name === ""}
                            helperText={newUser?.last_name === "" ? 'Campo obrigatório' : ' '}
                        />
                        <CssTextField
                            label="E-mail"
                            placeholder="Informe o seu novo email"
                            variant="outlined"
                            value={newUser?.email}
                            onChange={e => setNewUser({...newUser, email: e.target.value})}
                            error={newUser?.email === "" || !newUser?.email.includes('@')}
                            helperText={newUser?.email === "" && 'Campo obrigatório' || !newUser?.email.includes('@') && 'Email inválido'}
                        />
                    </div>

                    <GenericToast
                        type="success"
                        message="Dados salvos com sucesso!"
                        open={isSaved}
                        close={() => setIsSaved(false)}
                    />

                    <GenericToast
                        type="error"
                        message="Houve um erro na requisição. Tente mais tarde!"
                        open={displayError}
                        close={() => setDisplayError(false)}
                    />

                    <div className='actionButtonsDiv'>
                        <ActionButton
                            type='primary'
                            text={nameToUppercase('registrar')}
                            bordered
                            size={120}
                            color={'#FFF'}
                            background={'#1a2898'}
                            onClick={() => createUser()}
                        />

                        <ActionButton
                            type="secondary"
                            text={nameToUppercase('cancelar')}
                            bordered
                            size={120}
                            color={'#FFF'}
                            background={'#128d55'}
                            onClick={() => closeCreateModal()}
                        />
                    </div>
                </CreateModalContent>
            </CreateModal>

            <DeleteModal
                opened={isDeleteModalOpened}
                title='Remover Usuário'
                subTitle='Deseja realmente excluir este usuário?'
                onClose={closeDeleteModal}
            >
                <ActionButton
                    type='primary'
                    text={nameToUppercase('excluir')}
                    bordered
                    size={120}
                    color={'#FFF'}
                    background={'#FF0000'}
                    onClick={() => deleteSelectedUser(userId)}
                />

                <ActionButton
                    type="secondary"
                    text={nameToUppercase('cancelar')}
                    bordered
                    size={120}
                    color={'#FFF'}
                    background={'#128d55'}
                    onClick={() => closeDeleteModal()}
                />
            </DeleteModal>

            <ActionButton
                bordered
                type="secondary"
                text="Adicionar usuário"
                size={230}
                color={'#424242F'}
                icon={<PersonAdd style={{color: '#424242', marginRight: 8}}/>}
                onClick={() => openCreateModal()}
            />

            <MainTable
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
                                <TableCell align="left" className={tableClasses.cellBody}>
                                    <span>{listUser.first_name} {listUser.last_name}</span>
                                </TableCell>
                                <TableCell align="left" className={tableClasses.cellBody}>
                                    <span>{listUser.email}</span>
                                </TableCell>
                                <TableCell align="left" className={tableClasses.cellBody} style={{width: '250px'}}>
                                    <div className='actionButtonsDiv'>
                                        <Link to={`/users/${listUser.id}`}>
                                            <ActionButton
                                                type='primary'
                                                text={nameToUppercase('editar')}
                                                size={100}
                                                color={'#424242'}
                                                icon={<Edit style={{color: '#424242', marginRight: 8}}/>}
                                            />
                                        </Link>
                                        <ActionButton
                                            type='primary'
                                            text={nameToUppercase('excluir')}
                                            size={100}
                                            color={'#424242F'}
                                            icon={<Delete style={{color: '#FF0000', marginRight: 8}}/>}
                                            onClick={() => openDeleteModal(listUser.id)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </MainTable>
        </>
    );
}
