import styled from 'styled-components'

export const MainDiv = styled.div`
  min-height: 100vh;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  h2 {
    font-family: 'Roboto',sans-serif;
    color: grey;
    margin-top: 70px;
  }
  
  img {
    width: 550px;
    margin: 50px 0 30px 18px;
    
    @media(max-width: 710px) {
      width: 450px;
      margin: 100px 0 100px 12px;
    }

    @media(max-width: 510px) {
      width: 350px;
    }
  }
`;
