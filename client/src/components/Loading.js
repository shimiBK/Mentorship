import React from 'react';
import RingLoader  from "react-spinners/RingLoader";

const override = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };


const Loading = () => {
  return (
    <div className="loading">
        <RingLoader
        color="#ec3360"
        loading
        size={100}
        cssOverride={override}
        speedMultiplier={2}
        />
</div>
  )
}

export default Loading