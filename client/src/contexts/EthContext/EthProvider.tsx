import React, {useReducer, useCallback, useEffect} from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import {reducer, actions, initialState} from "./state";
import {apiBaseUrl} from "../../config";

type Props = {
    children: React.ReactNode;
}

const EthProvider: React.FC<Props> = ({children}: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const init = useCallback(
        async (artifact: any) => {
            if (artifact) {
                const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
                const accounts = await web3.eth.requestAccounts();
                const networkID = await web3.eth.net.getId();
                const {abi} = artifact;
                let address, contract;
                try {
                    address = artifact.networks[networkID].address;
                    contract = new web3.eth.Contract(abi, address);
                } catch (err) {
                    console.error(err);
                }
                dispatch({
                    type: actions.init,
                    data: {artifact, web3, accounts, networkID, contract}
                });
            }
        }, []);

    useEffect(() => {
        const tryInit = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/SimpleStorage.json`);
                const artifact = await response.json();
                init(artifact);
            } catch (err) {
                console.error(err);
            }
        };

        tryInit();
    }, [init]);

    useEffect(() => {
        const events = ["chainChanged", "accountsChanged"];
        const handleChange = () => {
            init(state.artifact);
        };

        events.forEach(e => window.ethereum!.on(e, handleChange));
        return () => {
            events.forEach(e => window.ethereum!.removeListener(e, handleChange));
        };
    }, [init, state.artifact]);

    return (
        <EthContext.Provider value={{
            state,
            dispatch
        } as any}>
            {children}
        </EthContext.Provider>
    );
}

export default EthProvider;