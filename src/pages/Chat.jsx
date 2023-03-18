import React, { useEffect, useState } from "react"
import { Sidebar } from "/components/"
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { octoChat } from "/public/assets";
import Head from "next/head";
import { Logo } from "/public/logo.png";


function index() {

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      window.location.assign('/')
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
          alert("Ops something went wrong");
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
          <link rel="icon" href={Logo} />
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

            <section className="relative flex items-center w-full bg-[#1c1c24] mt-16 rounded-lg">
              <div className="relative items-center w-full px-5 py-24 mx-auto md:px-12 lg:px-16 max-w-7xl">
                <div className="relative flex-col items-start m-auto align-middle">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
                    <div className="relative items-center gap-12 m-auto lg:inline-flex md:order-first">
                      <div className="max-w-xl text-center lg:text-left">
                        <div>
                          <p className="text-2xl font-medium tracking-tighter text-white sm:text-3xl">
                            Octochat : A developer's coffee break
                          </p>
                          <p className="max-w-xl mt-4 text-base tracking-tight text-gray-100">
                            "Get ready to connect like never before! Our brand new chat application, built on the power of GitHub, is coming soon. Stay tuned for an unparalleled chat experience that will transform the way you communicate with your peers. We can't wait to share our creation with you, so mark your calendars and get ready to chat like never before!"
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="order-first block w-full mt-12 aspect-auto lg:mt-0">
                      <img className="object-cover rounded-md  shadow-white shadow-2xl object-center w-full mx-auto bg-gray-300 lg:ml-auto " alt="hero" src={octoChat.src} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

        </div>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>OctoChat</title>
          <link rel="icon" href={Logo} />
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

export default index


