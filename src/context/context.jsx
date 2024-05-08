import React, { createContext, useState, useEffect } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

export function ContextProvider(props) {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    useEffect(() => {
        // Call onSent when the component mounts
        onSent("What is react js");
    }, []); // Empty dependency array ensures this runs only once on mount

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        const response = await runChat(prompt);
        setResultData(response);
        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

 export default ContextProvider