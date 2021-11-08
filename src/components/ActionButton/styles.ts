import styled from 'styled-components'

export const StyledButton = styled.button`
  height: 34px;
  padding: 16px;
  margin-top: 20px;
  border: 0;
  border-radius: 4px;

  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: filter 0.2s, background 0.2s;

  :hover {
    filter: brightness(95%);
  }

  .primary {
    color: var(--white);
    background: var(--color-primary);
  }

  .secondary {
    color: var(--color-general);
    background: transparent;
  }

  .secondary:hover {
    background: var(--white);
  }
`;
