import styled from 'styled-components'

export const MainDiv = styled.div`
  .formContainer {
    width: 100%;
    max-width: 1300px;
    margin: auto;
    padding: 24px;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .boxContainer {
    width: 100%;
    background: var(--white);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, .08);
    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .titleContainer {
    font-weight: 500;
    margin-bottom: 20px;
    color: var(--color-general);
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
    margin-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 10px;
    border-bottom: 2px solid #EEE;
  }
`;