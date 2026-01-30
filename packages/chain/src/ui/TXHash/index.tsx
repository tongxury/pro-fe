import {ChainName} from "../../type";
import {shorten} from "../../utils/formatter";


function TXHash({value, chain = 'solana'}: { value: string, chain?: ChainName,}) {
    switch (chain) {
        case 'solana':
            return <a target={'_blank'} href={`https://solscan.io/tx/${value}`}>{shorten(value)}</a>;
        default:
    }

    return <div>{value}</div>;
}

export default TXHash;
