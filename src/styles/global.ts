import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
  .pre-loader-div{
    width: 100vw;
    height: 100vh;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    opacity: 1;
    animation: .8s ease-in-out;
    animation-delay: 2.2s;
    animation-fill-mode: forwards;
    animation-name: pre-loader-div;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @keyframes pre-loader-div{
    0%{
      opacity: 1;
    }

    100%{
      opacity: 0;
      z-index: -1;
    }
  }

  .pre-loader-image{
    width: 20%;
    opacity: 0;
    animation: .8s ease-in-out;
    animation-delay: .2s;
    animation-fill-mode: forwards;
    animation-name: pre-loader-image;
  }

  @keyframes pre-loader-image{
    0%{
      opacity: 0;
    }

    100%{
      opacity: 1;
    }
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --color-primary: #05C46B;

    --color-general: #424242;
    --color-placeholder: #C4C4C4;
    --color-border: #AAAAAA;
    --color-line: #EEEBEB;

    --white: #FFF;
  }

  body {
    width: 100%;
    font: 500 16px Roboto, sans-serif;
    background: #FAFAFA;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    text-decoration: none;
  }
`;
