import styled from 'styled-components'

export const MainDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  max-width: 1300px;
  margin: auto;
  padding: 24px;

  display: flex;
  flex-direction: column;

  .boxContainer {
    width: 100%;
    background: var(--white);
    box-shadow: 0 4px 4px rgba(0, 0, 0, .08);
    border-radius: 3px;
    padding: 20px;
    margin: 20px 0;
    align-self: center;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .titleContainer {
    font-weight: 500;
    color: var(--color-general);
    margin-bottom: 20px;
  }

  .inputGroup {
    padding-bottom: 20px;
    margin-bottom: 10px;
    border-bottom: 2px solid #EEE;

    @media(max-width: 710px) {
      * {
        width: 100%;
      }
    }
    
    input {
      width: 270px;
      
      @media(max-width: 710px) {
        width: 100%;
      }
    }
  }
  
  .tablePagination {
    display: flex; 
    justify-content: center;
    margin-top: 15px;
  }
`;
