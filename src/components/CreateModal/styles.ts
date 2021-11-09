import styled from 'styled-components'

export const MainDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  max-width: 500px;
  height: 480px;
  padding: 20px;
  border-radius: 4px;
  background: var(--white);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  > h2 {
    color: var(--color-general);
    font-size: 20px;
    align-self: flex-start;
    justify-self: flex-start;
  }

  > span {
    margin-top: 25px;
  }

  .modalConfirm > p {
    font-weight: 400;
    color: #AAAAAA;
  }

  .modalContent {
    display: flex;
  }

  .modalContentDirection {
    flex-direction: column;
  }

  .modalContent > button:first-child {
    margin-right: 10px;
  }
`;
