import styled from 'styled-components'

export const MainDiv = styled.div`
  width: 100%;
  height: 120px;
  background-color: #464952;
  box-shadow: -2px 0 8px rgba(0,0,0, .8);
  padding: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  .imgContainer {
    width: 100%;
    max-width: 1250px;
    display: flex;
    justify-content: flex-start;
  }

  .imgContainer img {
    width: 150px;
    transition: .2s ease-in-out;
    
    :hover {
      transform: scale(1.05);
      cursor: pointer;
    }
  }
`;
