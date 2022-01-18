import React from "react";
import {Link, useMatch} from "react-router-dom";
import s from './CustomLink.module.scss'

type CustomLinkType = {
    to: string,
    addClass?: string
}
export const CustomLink: React.FC<CustomLinkType> = React.memo(props => {
    const {to, addClass, children} = props;

    const match = useMatch({
        path: to,
        end: to.length === 1
    })
    const finallyClassLink = match
        ? `${s.link} ${s.active} ${addClass}`
        : `${s.link} ${s.active}`;

    return (
        <Link {...props} className={finallyClassLink}>
            {children}
        </Link>
    )
})