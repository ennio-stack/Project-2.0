import { createContext, useState } from "react";
const VoitureContext = createContext();

export const VoitureContextProvider = ({children})=>{
    const [mark, setmark] = useState('NISAN');
    return<VoitureContext.Provider value={mark}>{children}</VoitureContext.Provider>
}
export default VoitureContext;