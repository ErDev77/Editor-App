import React from "react";
import { StoreApi } from "zustand";

export const createZustandContext = <TInitial, TStore extends StoreApi<unknown>>(
    getStore: (initial: TInitial) => TStore
) => {
    const Context = React.createContext(null as unknown as TStore);

    const Provider = (props: {
        children?: React.ReactNode;
        initialValue: TInitial;
    }) => {
        const [store] = React.useState(getStore(props.initialValue));

        return <Context.Provider value={store}>{props.children}</Context.Provider>;
    };

    return {
        useContext: (): TStore => React.useContext(Context),
        Context,
        Provider,
    };
};
