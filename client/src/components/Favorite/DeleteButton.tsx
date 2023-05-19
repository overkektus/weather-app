import React from 'react'
import styled from 'styled-components'

interface DeleteButtonProps {
  icon: JSX.Element
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ icon, onClick }) => {
  return <StyledButton onClick={onClick}>{icon}</StyledButton>
}

const StyledButton = styled.button`
  width: 2.2rem;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
`

export default DeleteButton
