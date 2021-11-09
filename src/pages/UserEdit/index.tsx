import React, {useCallback, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {withStyles, TextField} from '@material-ui/core';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {ActionButton} from "../../components/ActionButton";
import {GenericToast} from "../../components/GenericToast";
import * as UserEditService from "../../services/userEdit";
import {User} from "../../interfaces/User";
import {MainDiv} from "./styles";

type ParamsProps = {
    userId: string;
}

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


const UserEdit = () => {
    const {userId} = useParams<ParamsProps>();
    const [isLoading, setIsLoading] = useState(false);
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
        if (!selectedUser.first_name || !selectedUser.last_name || !selectedUser.email || !selectedUser.email.includes('@')) {
            setIsSaved(false);
            setDisplayError(true);
            return;
        }

        try {
            setIsLoading(true);

            await UserEditService.editUser(`/users/${userId}`, selectedUser).then(() => {
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

    useEffect(() => {
        getSpecificUser();
    }, [userId])

    return (
        <>
            <MainDiv>
                <div className="boxContainer">
                    <span className='titleSpan'>
                        Atualize seus dados
                    </span>

                    <div className="inputGroupUpdate">
                        <CssTextField
                            label="Primeiro nome"
                            placeholder="Informe o seu primeiro nome"
                            variant="outlined"
                            value={selectedUser?.first_name}
                            onChange={e => setSelectedUser({...selectedUser, first_name: e.target.value})}
                            error={selectedUser?.first_name === ""}
                            helperText={selectedUser?.first_name === "" ? 'Campo obrigatório' : ' '}
                        />
                        <CssTextField
                            label="Último nome"
                            placeholder="Informe o seu ultimo nome"
                            variant="outlined"
                            value={selectedUser?.last_name}
                            onChange={e => setSelectedUser({...selectedUser, last_name: e.target.value})}
                            error={selectedUser?.last_name === ""}
                            helperText={selectedUser?.last_name === "" ? 'Campo obrigatório' : ' '}
                        />
                        <CssTextField
                            label="E-mail"
                            placeholder="Informe o seu novo email"
                            variant="outlined"
                            value={selectedUser?.email}
                            onChange={e => setSelectedUser({...selectedUser, email: e.target.value})}
                            error={selectedUser?.email === "" || !selectedUser?.email.includes('@')}
                            helperText={selectedUser?.email === "" && 'Campo obrigatório' || !selectedUser?.email.includes('@') && 'Email inválido'}
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
                            type="primary"
                            text="Salvar"
                            size={140}
                            color={'#FFF'}
                            background={'#1a2898'}
                            bordered
                            disabled={isLoading}
                            onClick={() => editUser()}
                        />

                        <Link to="/users">
                            <ActionButton
                                type="secondary"
                                text="Voltar"
                                size={140}
                                color={'#FFF'}
                                background={'#128d55'}
                                bordered
                                disabled={isLoading}
                            />
                        </Link>
                    </div>
                </div>
            </MainDiv>
        </>
    )
}

export default UserEdit;
