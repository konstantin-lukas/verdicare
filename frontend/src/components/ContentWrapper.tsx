import React, {ReactNode} from 'react';
import './ContentWrapper.scss';

export default function ContentWrapper({children}: {children: ReactNode[] | ReactNode}) {
    return <main>{children}</main>;
}