/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Blog() {
    const [screenDimensions, setScreenDimensions] = useState({ width: 0, height: 0 });

    return (
        <section id="blog" className="flex flex-col text-white w-screen">
            <section
                className='flex md:flex-row sm:flew-col justify-center text-center'
            >
                <div className='m-auto justify-center text-left w-1/2'>
                    <img
                        src="/mangoes.jpg"
                        width="100%"
                        alt="fresh mangoes" />
                </div>
                <div className='m-auto justify-center text-left w-1/2'>
                    <h1 className="m-auto font-waterfall text-7xl text-white font-bold">Fresh Mangoes</h1>
                    <p>Farm fresh fruits straight from the farmers</p>
                </div>
            </section>
            <section
                className='flex md:flex-row sm:flew-col justify-center text-center'
            >
                <div className='m-auto justify-center text-left w-1/2'>
                    <h1 className="m-auto font-waterfall text-7xl text-white font-bold">Fresh Green Mangoes</h1>
                    <p>Farm fresh fruits straight from the farmers</p>
                </div>
                <div className='m-auto justify-center text-left w-1/2'>
                    <img
                        src="/greenMangoes.jpg"
                        width="98%"
                        alt="fresh mangoes" />
                </div>
            </section>
            <section
                className='flex md:flex-row sm:flew-col justify-center text-center'
            >
                <div className='m-auto justify-center text-left w-1/2'>
                    <img
                        src="/mangoes.jpg"
                        width="100%"
                        alt="fresh mangoes" />
                </div>
                <div className='m-auto justify-center text-left w-1/2'>
                    <h1 className="m-auto font-waterfall text-7xl text-white font-bold">Fresh Mangoes</h1>
                    <p>Farm fresh fruits straight from the farmers</p>
                </div>
            </section>
        </section>
    )
}