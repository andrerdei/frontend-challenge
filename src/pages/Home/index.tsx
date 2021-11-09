import React from 'react';
import {Link} from 'react-router-dom'
import * as HomeStyles from './styles'
import {ActionButton} from "../../components/ActionButton";

const Home = () => {
    return(
        <HomeStyles.MainDiv>
            <h2>Frontend Challenge Gofind</h2>

            <img src="/home_page_image.png" alt="Home Image" />

            <Link
                to="/users"
            >
                <ActionButton
                    type="primary"
                    text="Acesse a Lista de usuários"
                    size={300}
                    height={50}
                    color={'#FFF'}
                    bordered
                    background={'#464952'}
                />
            </Link>
        </HomeStyles.MainDiv>
    );
}

export default Home;
