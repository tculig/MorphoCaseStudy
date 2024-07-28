'use client';
import type { FC, MouseEventHandler } from 'react';

interface Props {
    readonly text: string;
    readonly onClick?: MouseEventHandler<HTMLButtonElement>;
    readonly disabled?: boolean;
    readonly className?: string;
}

const RainbowButton : FC<Props> = ({ text, className: additionalClassName, onClick, disabled=false }) =>
    <button
        onClick={onClick}
        disabled={disabled}
        type="button"
        className={("rainbow-button ").concat(additionalClassName ?? "")}>
    {text}
    </button>

export { RainbowButton };


