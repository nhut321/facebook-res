import { createContext, useState } from "react";

export const chatContext = createContext()

const ChatContextProvider = ({children}) => {
    const [conversationId, setConversationId] = useState()
    const selectConversation = (id) => {
        setConversationId(id)
    }

    const data = {
        conversationId,
        selectConversation
    }

    return (
        <chatContext.Provider value={data}>
            {children}
        </chatContext.Provider>
    )
}

export default ChatContextProvider