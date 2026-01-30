import {Dispatch, SetStateAction, useState} from "react";
import {useDebounce} from "ahooks";
import type {DebounceOptions} from "ahooks/lib/useDebounce/debounceOptions";


function useDebounceState<S>(initialState: S | (() => S), options?: DebounceOptions) {

    const [value, setValue] = useState<S>(initialState);
    const debouncedValue = useDebounce<S>(value, options);

    return {value: debouncedValue, setValue};
}

export default useDebounceState;
