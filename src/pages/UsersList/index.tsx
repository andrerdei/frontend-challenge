import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import * as UserListStyles from './styles'
import * as UsersListService from '../../services/usersList/index'
import {User} from "../../interfaces/User";
import {withStyles, TextField} from '@material-ui/core'
import {Search, PersonAdd, ArrowBack} from '@material-ui/icons'
import {UsersTable} from "../../components/UsersTable";
import {ActionButton} from "../../components/ActionButton";
import {capitalizeName} from "../../utils/captilizedName";
import {GenericToast} from "../../components/GenericToast";

const CssTextField = withStyles({
    root: {
        '&': {
            width: 300,
        },
        '& + &': {
            marginLeft: 10,
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

    function searchUser() {
        if (name === '' && email === '') {
            setAlert(true);
            return;
        }

        if (name) {
            const capitalizedName = capitalizeName(name);

            const foundNames = listUsers.filter(
                (listUser) => listUser.first_name === capitalizedName || listUser.last_name === capitalizedName
            );

            setListUsers(foundNames);
        }

        if (email) {
            const foundEmails = listUsers.filter(
                (listUser) => listUser.email === email
            );

            setListUsers(foundEmails);
        }
    }

    async function getUsersList() {
        await UsersListService.getUsersList('/users').then((response: any) => {
            const {data} = response.data;
            setListUsers(data);
        });
    }

    useEffect(() => {
        getUsersList();
    }, []);

    useEffect(() => {
        if (name === '' && email === '') {
            getUsersList();
        }
    }, [name, email]);

    return (
        <UserListStyles.MainDiv>
            <Link
                to="/"
                style={{ textDecoration: 'none', marginBottom: 10, marginTop: -35 }}
            >
                <ActionButton
                    type="secondary"
                    text="Voltar"
                    size={120}
                    bordered
                    icon={<ArrowBack style={{ color: '#424242', marginRight: 8 }} />}
                />
            </Link>

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
                        placeholder="Buscar por email"
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
                    icon={<Search style={{ color: '#FFF', marginRight: 8 }} />}
                    onClick={() => searchUser()}
                />
            </div>

            <ActionButton
                bordered
                type="secondary"
                text="Adicionar usuário"
                size={230}
                icon={<PersonAdd style={{ color: '#424242', marginRight: 8 }} />}
                // onClick={UsersTable.openCreateModal()}
            />
            <UsersTable users={listUsers} />
        </UserListStyles.MainDiv>
    );
}

export default UsersList;
