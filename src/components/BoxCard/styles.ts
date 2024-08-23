import { rem } from 'polished';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding:${rem(20)};
    padding-bottom:${rem(24)};
    text-align: center;
    justify-content: center;
    width: 350px;
    height: 350px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${rem(8)};
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: 0px 3px 12px 0px ${({ theme }) => theme.colors.shadow};
`;

const TextTop = styled.div`
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

const Icon = styled.div`
    padding-top: 3rem;
`

const Header = styled.div`
    font-size:${rem(20)};
    line-height:${rem(28)};
    padding-top:${rem(8)};
    color: ${({ theme }) => theme.colors.headerText};
`

const Text = styled.div`
   font-size:${rem(14)};
    line-height:${rem(20)};
    padding-top:${rem(8)};
    padding-bottom:${rem(48)};
    color: ${({ theme }) => theme.colors.bodyText};
`

const Footer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: ${rem(56)};
`

export { Container, TextTop, Icon, Header, Text, Footer };
