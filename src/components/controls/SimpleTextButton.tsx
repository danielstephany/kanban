import styled from 'styled-components'

const SimpleTextButton = styled.button`
    background: transparent;
    border: none;
    outline: none;
    color: ${ ({ theme }) => theme.mode === "dark" ? theme.palette.text.primary : theme.palette.text.primary };
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`

export default SimpleTextButton