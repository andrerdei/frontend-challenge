import React from 'react';
import {Link} from 'react-router-dom'
import {ArrowBack} from '@material-ui/icons'
import * as HomeStyles from './styles'
import {ActionButton} from "../../components/ActionButton";

const Home = () => {
    return(
        <HomeStyles.MainDiv>
            <Link
                to="/users"
                style={{ textDecoration: 'none', marginBottom: 10, marginTop: -35 }}
            >
                <ActionButton
                    type="primary"
                    text="Lista de usuários"
                    size={120}
                    bordered
                    icon={<ArrowBack style={{ color: '#424242', marginRight: 8 }} />}
                />
            </Link>
        </HomeStyles.MainDiv>
    );
}

export default Home;
