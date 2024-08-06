'use client';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import * as Styled from './styles';

interface Props {
    readonly icon?: ReactNode;
    readonly header?: string;
    readonly text?: string;
    readonly footer?: ReactNode;
    readonly className?: string;
}

const BoxCard: FC<PropsWithChildren<Props>> = ({ icon, header, text, footer, children, className }) => {
    return (
        <Styled.Container className={className}>
            <Styled.TextTop>
                {icon ? <Styled.Icon>{icon}</Styled.Icon> : null}
                {header ? <Styled.Header>{header}</Styled.Header> : null}
                {text ? <Styled.Text>{text}</Styled.Text> : null}
                {children}
            </Styled.TextTop>
            <Styled.Footer>
                {footer ?? null}
            </Styled.Footer>
        </Styled.Container>
    )
}

export { BoxCard };
