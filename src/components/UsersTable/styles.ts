import styled from 'styled-components'

export const MainTable = styled.table`
  .actionButtonsDiv {
    max-width: 250px;

    display: flex;
    justify-content: space-between;
  }
`;

export const CreateModalContent = styled.table`
  max-width: 500px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .inputGroupCreate {
    margin-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 10px;
    border-bottom: 2px solid #EEE;
    
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
