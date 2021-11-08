import styled from 'styled-components'

export const MainDiv = styled.div`
  .modalConfirm {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    width: 500px;
    height: 150px;
    padding: 20px;
    border-radius: 4px;
    background: var(--white);
  }

  .modalConfirm > h2 {
    color: var(--color-general);
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
