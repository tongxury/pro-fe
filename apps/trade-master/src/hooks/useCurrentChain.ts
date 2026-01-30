import {state} from "@/providers/state.ts";
import {useSnapshot} from "valtio/index";
import {CHAIN_SOLANA} from "@/contants.ts";
import {Chain} from "@/types";


const useCurrentChain = () => {
    const snap = useSnapshot(state)

    return {
        chain: snap.chain as Chain || CHAIN_SOLANA
    }
}

export default useCurrentChain;
