const { createContext } = require("react");

//First create context..
const userContext = createContext();

//Provider..
const contextProvider = ({children}) =>{
    return <userContext.Provider>
        <children>
            
        </children>
    </userContext.Provider>
}