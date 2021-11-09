import React, {useEffect, useState} from 'react';
import * as UserListStyles from './styles'
import * as UsersListService from '../../services/usersList/index'
import {User} from "../../interfaces/User";
import {withStyles, TextField, TablePagination} from '@material-ui/core'
import {Search} from '@material-ui/icons'
import {UsersTable} from "../../components/UsersTable";
import {ActionButton} from "../../components/ActionButton";
import {nameToUppercase} from "../../utils/formatStrings";
import {GenericToast} from "../../components/GenericToast";

const CssTextField = withStyles({
    root: {
        '&': {
            marginRight: 10,
            marginTop: 10,
            marginBottom: 10,
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

const UsersList = () => {
    const [listUsers, setListUsers] = useState<User[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const handlePageChange = (event: any, newPage: number) => {
        setCurrentPage(newPage);
    }

    function searchUser() {
        if (name === '' && email === '') {
            setAlert(true);
            return;
        }

        if (name) {
            const foundNames = listUsers.filter(
                (listUser) => nameToUppercase(listUser.first_name).includes(nameToUppercase(name))
                    || nameToUppercase(listUser.last_name).includes(nameToUppercase(name))
            );

            foundNames[0]
                ? setListUsers(foundNames)
                : setName('');
        }

        if (email) {
            const foundEmails = listUsers.filter(
                (listUser) => nameToUppercase(listUser.email).includes(nameToUppercase(email))
            );

            foundEmails[0]
                ? setListUsers(foundEmails)
                : setEmail('');
        }
    }

    async function getUsersList(pageNumber: number) {
        await UsersListService.getUsersList(`/users?page=${pageNumber + 1}`).then((response: any) => {
            const {data, per_page, total} = response.data;
            setItemsPerPage(per_page);
            setTotalItems(total);
            setListUsers(data);
        });
    }

    useEffect(() => {
        getUsersList(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (name === '' && email === '') {
            setListUsers(listUsers);
            getUsersList(currentPage);
        }
    }, [name, email]);

    return (
        <UserListStyles.MainDiv>
            <div className="boxContainer">
                <span className="titleContainer">Busca</span>

                <div className="inputGroup">
                    <CssTextField
                        label="Nome do usuário"
                        placeholder="Buscar por nome ou sobrenome..."
                        variant="outlined"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <CssTextField
                        label="E-mail"
                        placeholder="Buscar por email..."
                        variant="outlined"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <GenericToast
                    type="warning"
                    message="Por favor, verifique se pelo menos um dos campos estão preenchidos."
                    open={alert}
                    close={() => setAlert(false)}
                />

                <ActionButton
                    type="primary"
                    text="Buscar"
                    size={120}
                    color={'#FFF'}
                    background={'#05C46B'}
                    icon={<Search style={{color: '#FFF', marginRight: 8}}/>}
                    onClick={() => searchUser()}
                />
            </div>
            <UsersTable users={listUsers}/>
            <TablePagination
                className='tablePagination'
                count={totalItems}
                page={currentPage}
                onPageChange={handlePageChange}
                rowsPerPage={itemsPerPage}
                rowsPerPageOptions={[itemsPerPage]}
            />
        </UserListStyles.MainDiv>
    );
}

export default UsersList;
