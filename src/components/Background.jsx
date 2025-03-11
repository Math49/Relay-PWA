"use client";

export default function Background(){
    return(
        <div className="w-[100vw] h-[100vh] C-bg-red absolute z-0 top-0 left-0">
            <img src="/images/elements/rond.svg" className="absolute z-10 right-[45vw] bottom-[70vh] md:bottom-[50vh]" />
            <img src="/images/elements/barcode.svg" className="absolute md:w-[30vw] w-[80vw] h-auto z-10 md:left-[80vw] left-[80vw] right-[10vw] md:top-[20vh] top-[30vh]" />
            <img src="/images/elements/vague.svg" className="absolute w-auto h-[40%] z-10 md:right-[85vw] right-[50vw] top-[70vh]"/>
        </div>
    )
}