import { createContext } from "react";
const APIContext = createContext();
const { Provider, Consumer } = APIContext;
export { Provider as APIContextProvider, Consumer as APIContextConsumer };
