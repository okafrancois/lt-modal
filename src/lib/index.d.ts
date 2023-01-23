// @ts-ignore
import React, {ReactNode} from 'react';

interface LtModalProps {
    children: ReactNode;
    title?: string | ReactNode;
    state: boolean;
    closeHandler: () => void;
}

declare const LtModal: React.FC<LtModalProps>;

export default LtModal;
