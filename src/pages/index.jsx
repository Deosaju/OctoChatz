import React, { useEffect, useState } from "react"
import { Sidebar } from "/components/"
import qs from "query-string";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Head from "next/head";
import Logo from "/public/logo.png";

function index() {

  const [accessToken, setAccessToken] = useState(null);
  const [userAutherized, setUserAutherized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { code } = qs.parseUrl(window.location.href).query;
    if (code) {
      setUserAutherized(true);
    }
    else {
      setUserAutherized(false);
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  function redirectToGithub() {
    const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
    const params = {
      response_type: 'code',
      scope: 'user public_repo',
      client_id: '278f8246f7cda39bd489',
      state: 'test-t5'
    }

    const queryStrings = qs.stringify(params);
    const authorizationUrl = `${GITHUB_AUTH_URL}?${queryStrings}`;
    window.location.href = authorizationUrl;

  }


  async function getAccessToken() {

    const { code } = qs.parseUrl(window.location.href).query;
    if (code) {
      try {
        console.log("Code", code);
        const response = await axios.post(`/api/login`, { code }); // This is the server
        console.log("Access Token", response.data);
        setAccessToken(response.data);
        localStorage.setItem("accessToken", response.data);


      } catch (err) {
        toast.error("Ops something went wrong");
        console.log("err", err);
      }
    }

  }

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


  if (accessToken && user) {

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
              <div className="flex items-center">
                <span className="text-white font-bold mr-2">{user.login}</span>
                <img src={user.avatar_url} alt="Profile Picture" className="rounded-full h-10 w-10 object-cover" />
                <button className="bg-red-600/30 text-white rounded-full px-4 py-2 ml-4" onClick={signOut}>Sign Out</button>
              </div>
            </nav>


            <div className="relative" id="home">
              <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
              </div>
              <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                <div className="relative pt-24 ml-auto">
                  <div className="lg:w-2/3 text-center mx-auto">
                    <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Shaping a world with <span className="text-primary dark:text-white">reimagination.</span></h1>
                    <p className="mt-8 text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!</p>
                    <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                      <a
                        href="#"
                        className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                      >
                        <span className="relative text-base font-semibold text-white"
                        >Get started</span
                        >
                      </a>
                      <a
                        href="#"
                        className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                      >
                        <span
                          className="relative text-base font-semibold text-primary dark:text-white"
                        >Learn more</span
                        >
                      </a>
                    </div>
                    <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
                      <div className="text-left">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The lowest price</h6>
                        <p className="mt-2 text-gray-500">Some text here</p>
                      </div>
                      <div className="text-left">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The fastest on the market</h6>
                        <p className="mt-2 text-gray-500">Some text here</p>
                      </div>
                      <div className="text-left">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The most loved</h6>
                        <p className="mt-2 text-gray-500">Some text here</p>
                      </div>
                    </div>
                  </div>
                </div>
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
              <div className="flex items-center">
                {userAutherized ? <button className="bg-[#2f80ed]/10 text-white px-4 py-2 rounded-md" onClick={getAccessToken}><span className="relative text-base font-semibold text-white"
                >Get Access</span
                ></button> : <button className="bg-[#2f80ed]/10 text-white px-4 py-2 rounded-md" onClick={redirectToGithub}><span className="relative text-base font-semibold text-white"
                >Autherize</span
                ></button>}
              </div>

            </nav>
            <div className="relative" id="home">
              <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
              </div>
              <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                <div className="relative pt-24 ml-auto">
                  <div className="lg:w-2/3 text-center mx-auto">
                    <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Shaping a world with <span className="text-primary dark:text-white">reimagination.</span></h1>
                    <p className="mt-8 text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!</p>
                    <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                      <a
                        href="#"
                        className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                      >
                        <span className="relative text-base font-semibold text-white"
                        >Get started</span
                        >
                      </a>
                      <a
                        href="#"
                        className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                      >
                        <span
                          className="relative text-base font-semibold text-primary dark:text-white"
                        >Learn more</span
                        >
                      </a>
                    </div>
                    <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
                      <div className="text-left">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The lowest price</h6>
                        <p className="mt-2 text-gray-500">Some text here</p>
                      </div>
                      <div className="text-left">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The fastest on the market</h6>
                        <p className="mt-2 text-gray-500">Some text here</p>
                      </div>
                      <div className="text-left">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The most loved</h6>
                        <p className="mt-2 text-gray-500">Some text here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      </>
    )
  }

}

export default index


