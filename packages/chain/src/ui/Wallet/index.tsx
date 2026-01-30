import {ChainName} from "../../type";
import {shorten} from "../../utils/formatter";
import {HTMLAttributes} from "react";

export interface WalletProps extends HTMLAttributes<any> {
    value: string
    name?: string
    chain?: ChainName,
    short?: boolean,
}

function Wallet({value, name, short, chain = 'solana', ...rest}: WalletProps) {
    return <a {...rest}>{short ? value : shorten(value)}{name ? `(${name})` : ''}</a>;
}

export default Wallet;
