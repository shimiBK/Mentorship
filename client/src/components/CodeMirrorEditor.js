import React from 'react'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";


const CodeMirrorEditor = ({value, readOnly , onChange}) => {
  return (
    <CodeMirror
    value={value}
    height="400px"
    width='800px'
    theme="dark"
    extensions={[javascript({ jsx: true })]}
    readOnly={readOnly}
    onChange={onChange}
  />
  )
}

export default CodeMirrorEditor