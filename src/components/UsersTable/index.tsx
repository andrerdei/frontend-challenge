import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {makeStyles, TableFooter, TextField, Theme, withStyles} from '@material-ui/core'
import {TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import {Edit, Delete, Clear, PersonAdd} from '@material-ui/icons'
import {User} from "../../interfaces/User";
import {NewUser} from "../../interfaces/newUser";
import {DeleteModal} from "../DeleteModal";
import {ActionButton} from "../ActionButton";
import {nameToUppercase} from "../../utils/formatStrings";
import {CreateModal} from "../CreateModal";
import {GenericToast} from "../GenericToast";
import {CreateModalContent, MainTable} from "./styles";
import * as usersListService from "../../services/usersList";

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
    const [isLoading, setIsLoading] = useState(false);
    const [newUser, setNewUser] = useState<NewUser>({
        first_name: '',
        last_name: '',
        email: '',
    });
    const [isFirstNameTouched, setIsFirstNameTouched] = useState(false);
    const [isLastNameTouched, setIsLastNameTouched] = useState(false);
    const [isEmailTouched, setIsEmailTouched] = useState(false);
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
        setIsFirstNameTouched(false);
        setIsLastNameTouched(false);
        setIsEmailTouched(false);

        setIsSaved(false);
        setDisplayError(false);
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
            setIsFirstNameTouched(true);
            setIsLastNameTouched(true);
            setIsEmailTouched(true);

            setIsSaved(false);
            setDisplayError(true);
            return;
        }

        try {
            setIsLoading(true);

            return usersListService.createUser(`/users`, newUser).then(() => {
                setIsSaved(true);
                setDisplayError(false);
                setIsLoading(false);
            });

        } catch {
            setIsSaved(false);
            setDisplayError(true);
            setIsLoading(false);
        }
    }

    function deleteSelectedUser(id: number) {
        setIsLoading(true);
        const endpoint = `/users/${id}`
        return usersListService.deleteUser(endpoint).then(() => {
            const currentUsers = newUsers.filter((listUser) => listUser.id !== id)
            setNewUsers(currentUsers);
            setIsDeleteModalOpened(false);

            setIsLoading(false);
        });
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
                <CreateModalContent>
                    <div className="inputGroupCreate">
                        <CssTextField
                            label="Primeiro nome"
                            placeholder="Informe o seu primeiro nome"
                            variant="outlined"
                            value={newUser?.first_name}
                            onChange={
                                e => {
                                    setNewUser({...newUser, first_name: e.target.value});
                                    setIsFirstNameTouched(true);
                                }
                            }
                            error={newUser?.first_name === "" && isFirstNameTouched}
                            helperText={newUser?.first_name === "" ? 'Campo obrigatório' : ' '}
                        />
                        <CssTextField
                            label="Último nome"
                            placeholder="Informe o seu ultimo nome"
                            variant="outlined"
                            value={newUser?.last_name}
                            onChange={
                                e => {
                                    setNewUser({...newUser, last_name: e.target.value});
                                    setIsLastNameTouched(true);
                                }
                            }
                            error={newUser?.last_name === "" && isLastNameTouched}
                            helperText={newUser?.last_name === "" ? 'Campo obrigatório' : ' '}
                        />
                        <CssTextField
                            label="E-mail"
                            placeholder="Informe o seu novo email"
                            variant="outlined"
                            value={newUser?.email}
                            onChange={
                                e => {
                                    setNewUser({...newUser, email: e.target.value});
                                    setIsEmailTouched(true);
                                }
                            }
                            error={(newUser?.email === "" && isEmailTouched) || (!newUser?.email.includes('@') && isEmailTouched)}
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
                            disabled={isLoading}
                            onClick={() => createUser()}
                        />

                        <ActionButton
                            type="secondary"
                            text={nameToUppercase('cancelar')}
                            bordered
                            size={120}
                            color={'#FFF'}
                            background={'#128d55'}
                            disabled={isLoading}
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
                    disabled={isLoading}
                    onClick={() => deleteSelectedUser(userId)}
                />

                <ActionButton
                    type="secondary"
                    text={nameToUppercase('cancelar')}
                    bordered
                    size={120}
                    color={'#FFF'}
                    background={'#128d55'}
                    disabled={isLoading}
                    onClick={() => closeDeleteModal()}
                />
            </DeleteModal>

            <ActionButton
                bordered
                type="secondary"
                text="Adicionar usuário"
                size={230}
                color={'#424242F'}
                background={'#FFF'}
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
