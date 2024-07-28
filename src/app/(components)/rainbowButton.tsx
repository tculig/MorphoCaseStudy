import type { FC } from 'react';

interface Props {
    readonly text: string;
    readonly disabled?: boolean;
    readonly className?: string;
}

const RainbowButton : FC<Props> = ({ text, className: additionalClassName, disabled=false }) =>
    <button
        disabled={disabled}
        type="button"
        className={("rainbow-button ").concat(additionalClassName ?? "")}>
        {text}
    </button>

export { RainbowButton };


