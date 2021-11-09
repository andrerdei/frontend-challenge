import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import * as UserListStyles from './styles'
import * as UsersListService from '../../services/usersList/index'
import {User} from "../../interfaces/User";
import {withStyles, TextField} from '@material-ui/core'
import {Search, PersonAdd, ArrowBack} from '@material-ui/icons'
import {UsersTable} from "../../components/UsersTable";
import {ActionButton} from "../../components/ActionButton";
import {capitalizeName, nameToUppercase} from "../../utils/formatStrings";
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

            console.log(foundNames);

            foundNames[0]
                ? setListUsers(foundNames)
                : setName('');
        }

        if (email) {
            const foundEmails = listUsers.filter(
                (listUser) => nameToUppercase(listUser.email).includes(nameToUppercase(email))
            );

            console.log(foundEmails)

            foundEmails[0]
                ? setListUsers(foundEmails)
                : setEmail('');
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
            setListUsers(listUsers);
        }
    }, [name, email]);

    return (
        <UserListStyles.MainDiv>
            {/*<Link*/}
            {/*    to="/"*/}
            {/*    style={{ textDecoration: 'none', marginBottom: 10, marginTop: -35 }}*/}
            {/*>*/}
            {/*    <ActionButton*/}
            {/*        type="secondary"*/}
            {/*        text="Voltar"*/}
            {/*        size={120}*/}
            {/*        bordered*/}
            {/*        icon={<ArrowBack style={{ color: '#424242', marginRight: 8 }} />}*/}
            {/*    />*/}
            {/*</Link>*/}

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
        </UserListStyles.MainDiv>
    );
}

export default UsersList;
