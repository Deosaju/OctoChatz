import React, { use, useEffect, useState } from "react"
import { Sidebar } from "/components/"
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import Head from "next/head";
import Logo from "/public/logo.png";

function Profile() {

    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setAccessToken(accessToken);
        }
        else {
            setTimeout(() => {
                window.location.assign("/");
            }, 3000);
        }
    }, []);

    useEffect(() => {

        if (accessToken) {
            async function getUser() {
                try {
                    const response = await axios.post(`/api/user`, { accessToken });
                    console.log("User Data", response.data);
                    setUser(response.data);
                } catch (err) {
                    toast.error("Hey did you start the server?");
                    console.log("err", err);
                }
            }
            getUser();
        }
    }, [accessToken]);

    function signOut() {
        localStorage.removeItem("accessToken");
        setAccessToken(null);
        setUser(null);
        window.location.href = "/";
    }

    function inTest() {
        toast('Feature is currently building!', {
            icon: '🏗️',
        });
    }



    if (accessToken && user) {
        return (
            <>
                <Head>
                    <title>OctoChat</title>
                    <link rel="icon" href={Logo.src} />
                </Head>
                <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row ">
                    <div className="sm:flex hidden mr-10 relative">
                        <Sidebar />
                    </div>
                    <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 ">

                        <nav className="bg-[#13131a] px-8 py-4 flex justify-between">
                            <div>
                                <a href="/" className="text-white font-bold text-xl">OctoChat</a>
                            </div>
                            <div className="flex items-center">
                                <span className="text-white font-bold mr-2">{user.login}</span>
                                <img src={user.avatar_url} alt="Profile Picture" className="rounded-full h-10 w-10 object-cover" />
                                <button className="bg-red-600/30 text-white rounded-full px-4 py-2 ml-4" onClick={signOut}>Sign Out</button>
                            </div>
                        </nav>

                        <div className="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-[#13131a] dark:border-gray-700">
                            <div className="flex justify-end px-4 pt-4">

                                <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2" aria-labelledby="dropdownButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex flex-col items-center pb-10">
                                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.avatar_url} alt="Bonnie image" />
                                <h5 className=" text-xl font-medium text-gray-900 dark:text-white">{user.login}</h5>
                                <div className="flex mt-0  space-x-3 md:mt-3">
                                    <Link href="/Profile/Followers" ><span className="text-sm text-gray-500 dark:text-gray-400">Followers : {user.followers}</span></Link>
                                    <Link href="/Profile/Following" ><span className="text-sm text-gray-500 dark:text-gray-400">Following : {user.following}</span></Link>
                                </div>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <button href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={inTest}>Add friend</button>
                                    <button href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700" onClick={inTest}>Message</button>
                                </div>

                                <section aria-labelledby="feature-five" id="feature-five" className="overflow-y-auto bg-[#13131a] lg:h-80 mt-5 ">
                                    <div className="px-14 py-3 mx-auto lg:px-16 max-w-full md:px-12 xl:px-36 lg:flex ">
                                        <div className="lg:w-1/2">
                                            <div className="top-0 pt-1 pb-8 lg:sticky">
                                                <div>
                                                    <div className="lg:pr-24 md:pr-12">
                                                        <div>

                                                            <p className="text-4xl text-white ">
                                                                `{user.bio}`
                                                            </p>
                                                            <p className="max-w-xl mt-4 text-lg tracking-tight text-gray-500">
                                                                Joined On : {user.created_at}
                                                            </p>
                                                            <p className="max-w-xl mt-4 text-lg tracking-tight text-gray-500">
                                                                Twitter : <Link href={`https://twitter.com/${user.twitter_username}`}>https://twitter.com/{user.twitter_username}</Link>
                                                            </p>
                                                            <p className="max-w-xl mt-4 text-lg tracking-tight text-gray-500">
                                                                Blog : <Link href={`${user.blog}`}>{user.blog}</Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:w-1/2">
                                            <div className="flex-shrink-0">
                                                <div>
                                                    <ul className="grid grid-cols-1 gap-0 mt-12 list-none lg:mt-0 lg:gap-0 " role="list">

                                                        <li>
                                                            <div>
                                                                <p className="mt-5 text-lg font-medium leading-6 text-white">
                                                                    Location
                                                                </p>
                                                            </div>
                                                            <div className="mt-2 text-base text-gray-500">
                                                                {user.location}
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div>
                                                                <p className="mt-5 text-lg font-medium leading-6 text-white">
                                                                    <Link href={`https://github.com/${user.login}`}>Private Repos</Link>
                                                                </p>
                                                            </div>
                                                            <div className="mt-2 text-base text-gray-500">
                                                                {user.owned_private_repos}
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <p className="mt-5 text-lg font-medium leading-6 text-white">
                                                                    <Link href={`https://github.com/${user.login}?tab=repositories`}>Public Repos</Link>
                                                                </p>
                                                            </div>
                                                            <div className="mt-2 text-base text-gray-500">
                                                                {user.public_repos}
                                                            </div>
                                                        </li>
                                                    </ul>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>

                    </div>
                    <Toaster />
                </div>
            </>

        )
    }
    else {
        return (
            <>
                <Head>
                    <title>OctoChat</title>
                    <link rel="icon" href={Logo.src} />
                </Head>
                <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
                    <div className="sm:flex hidden mr-10 relative">
                        <Sidebar />
                    </div>
                    <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">

                        <nav className="bg-[#13131a] px-8 py-4 flex justify-between">
                            <div>
                                <a href="/" className="text-white font-bold text-xl">OctoChat</a>
                            </div>
                        </nav>
                        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                        </div>
                    </div>
                    <Toaster />
                </div>

            </>
        )
    }
}

export default Profile


