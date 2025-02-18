import React, { useState } from "react";
import './compressString.scss';
// KEY PART: importing functions used for string compressing/decompressing
import { compressString, decompressString, isDecompressible } from "../utils/strings";

const CompressString = () => {

    // KEY PART: saving the state of the input and output
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // KEY PART: allowing only lowercase letters or digits for decompresing
        if (/^[a-z0-9]*$/.test(value)) {
            setInput(value);
        }
    };

    // KEY PART: creating a function to handle form submit for compressing or decompressing
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (input === "") {
            setOutput('""');
        }
        // KEY PART: using imported function from strings.ts file, which shows if input is a valid string based on our rules
        else if (isDecompressible(input)) {
            setOutput(`"${decompressString(input)}"`);
        }
        // KEY PART: same here, using different function
        else if (/^[a-z]+$/.test(input)) {
            setOutput(`"${compressString(input)}"`);
        }
    };

    const clearInput = () => {
        setInput("");
    };

    const clearOutput = () => {
        setOutput("");
    };

    return (
        <section className="compressStringWrapper">
            <h2>String <span className="compress">Compressor</span> / <span className="decompress">Decompressor</span></h2>
            <p className="simpleText">Rules of usage:</p>
            <div className="rulesWrapper">
                <div className="compressRules">
                    <p>In order to <span className="compress">compress</span> a string, a specific format of input must be used:</p>
                    <ul>
                        <li>"aaabb"</li>
                        <li>"abc"</li>
                        <li>"bbbbbsssddsdssd"</li>
                        <li>etc...</li>
                    </ul>
                </div>
                <div className="decompressRules">
                    <p>In order to <span className="decompress">decompress</span> a string, a specific format of input must be used:</p>
                    <ul>
                        <li>"a3b2"</li>
                        <li>"a1b1c1"</li>
                        <li>"a5b2c6x50r5"</li>
                        <li>etc...</li>
                    </ul>
                </div>
            </div>
            <p className="buttonExplanationTxt">Uppon entering a string, the button will show you what can be done with the string based on the format, if it is disabled, it means the format of the provided string is wrong.</p>
            <form onSubmit={handleSubmit}>
                <div className="inputWrapper">
                    <input
                        type="text"
                        value={input}
                        onChange={handleChange}
                        placeholder="Enter a string"
                    />
                    {input && <button type="button" onClick={clearInput}>✖</button>}
                </div>
                <button
                    className="mainBtn"
                    type="submit"
                    disabled={!(input === "" || /^[a-z]+$/.test(input) || isDecompressible(input))}>
                    {isDecompressible(input) ? "Decompress" : "Compress"}
                </button>
            </form>
            <div className="output">
                <p><b>Output:</b> {output}</p>
                {output && <button onClick={clearOutput}>✖</button>}
            </div>
        </section>
    );
};

export default CompressString;