import React from "react";

const Loading = () => {
    return (
        <section className="h-screen flex justify-center items-center">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <span className="text-[#99999]">Please wait</span>
        </section>
    );
};

export default Loading;
