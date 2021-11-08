import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {withStyles, TextField} from '@material-ui/core';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {ActionButton} from "../../components/ActionButton";
import {GenericToast} from "../../components/GenericToast";
import * as UserEditService from "../../services/userEdit";
import {User} from "../../interfaces/User";

type ParamsProps = {
    userId: string;
}

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


const UserEdit = () => {
    const {userId} = useParams<ParamsProps>();

    const [isSaved, setIsSaved] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>({
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
    });

    async function getSpecificUser() {
        try {
            await UserEditService.getSpecificUser(`/users/${userId}`).then((response: any) => {
                const {data} = response.data;
                setSelectedUser(data);
            });
        } catch {
            setDisplayError(true);
        }
    }

    async function editUser() {
        try {
            await UserEditService.editUser(`/users/${userId}`, selectedUser).then((response: any) => {
                setSelectedUser(selectedUser);
                setIsSaved(true);
            });
        } catch {
            setDisplayError(true);
        }
    }

    useEffect(() => {
        getSpecificUser();
    }, [userId])

    return (
        <>
            <div className="formContainer">
                <Link to="/users" style={{textDecoration: 'none', marginBottom: 20}}>
                    <ActionButton
                        type="secondary"
                        text="Voltar"
                        size={120}
                        bordered
                        icon={<ArrowBack style={{color: '#424242', marginRight: 8}}/>}
                    />
                </Link>

                <div className="boxContainer">
                    <span className="titleContainer">
                        Atualize seus dados
                    </span>

                    <div className="profileContainer">
                        <div className="detailProfile">
                            <span className="nameProfile">
                                {selectedUser?.first_name} {selectedUser?.last_name}
                            </span>

                            <span className="emailProfile">
                                {selectedUser?.email}
                            </span>
                        </div>
                    </div>

                    <div className="inputGroupUpdate">
                        <CssTextField
                            disabled
                            label="ID"
                            variant="outlined"
                            value={selectedUser?.id}
                            style={{width: 280}}
                        />
                        <CssTextField
                            label="Primeiro nome"
                            placeholder="Informe o seu primeiro nome"
                            variant="outlined"
                            value={selectedUser?.first_name}
                            onChange={e => setSelectedUser({...selectedUser, first_name: e.target.value})}
                        />
                        <CssTextField
                            label="Último nome"
                            placeholder="Informe o seu ultimo nome"
                            variant="outlined"
                            value={selectedUser?.last_name}
                            onChange={e => setSelectedUser({...selectedUser, last_name: e.target.value})}
                        />
                        <CssTextField
                            required
                            label="E-mail"
                            placeholder="Informe o seu novo email"
                            variant="outlined"
                            value={selectedUser?.email}
                            onChange={e => setSelectedUser({...selectedUser, email: e.target.value})}
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

                    <ActionButton
                        type="primary"
                        text="Salvar"
                        size={120}
                        icon={<SaveAlt style={{color: '#FFF', marginRight: 8}}/>}
                        onClick={() => editUser()}
                    />
                </div>
            </div>
        </>
    )
}

export default UserEdit;