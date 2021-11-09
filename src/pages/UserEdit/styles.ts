import styled from 'styled-components'

export const MainDiv = styled.div`
    min-height: 100vh;
  
    display: flex;
    justify-content: center;
    align-items: flex-start;

  .titleSpan {
    font-weight: 500;
    margin-bottom: 20px;
    color: var(--color-general);  
    align-self: flex-start;
  }
  
  .boxContainer {
    max-width: 800px;
    background: var(--white);
    box-shadow: 0 4px 4px rgba(0, 0, 0, .08);
    padding: 20px;
    margin-top: 150px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media(max-width: 700px) {
      width: 90%;
    }
  }
  
  .profileContainer {
    display: flex;
  }

  .detailProfile {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
  }

  .nameProfile {
    font-size: 30px;
    padding: 10px 0px;
    margin-top: -10px;
    border-bottom: 1px solid var(--color-line);
    color: var(--color-general);
  }

  .emailProfile {
    font-weight: 500;
    margin-top: 10px;
    color: #C4C4C4;
  }

  .inputGroupUpdate {
    width: 600px;
    margin-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 10px;
    border-bottom: 2px solid #EEE;
    
    @media(max-width: 700px) {
      width: 100%;
    }
  }
  
  .actionButtonsDiv {
    width: 350px;
    display: flex;
    justify-content: space-around;
    margin-top: 15px;

    @media(max-width: 400px) {
      width: 300px;
    }
  }
`;
