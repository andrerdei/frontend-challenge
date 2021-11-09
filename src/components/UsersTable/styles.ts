import styled from 'styled-components'

export const MainTable = styled.table`
  background-color: rgba(255,255,255, .8);
  border-radius: 3px;
  
  span {
    
    @media(max-width: 470px) {
      font-size: 14px; 
    }
  }
  
  .actionButtonsDiv {
    max-width: 250px;

    display: flex;
    justify-content: space-between;
    
    @media(max-width: 600px) {
      max-width: 150px;
      flex-direction: column;
    }
  }
`;

export const CreateModalContent = styled.table`
  max-width: 500px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .inputGroupCreate {
    width: 450px;
    margin-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 10px;
    border-bottom: 2px solid #EEE;
    
    @media(max-width: 550px) {
      width: 100%;
    }
    
    input {
      height: 15px;
    }
  }

  .actionButtonsDiv {
    width: 350px;
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
  }
`
