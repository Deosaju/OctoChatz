import React, { useEffect, useState } from "react"
import { Sidebar } from "/components/"
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Head from "next/head";
import Logo from "/public/logo.png";
import qs from "query-string";
import Link from "next/link";

function index() {

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [searchUser, setSearchUser] = useState(null);


  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      setTimeout(() => {
        window.location.assign('/')
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


  function getFollowing() {
    async function getUser() {
      try {
        const response = await axios.post(`/api/following`, { accessToken });
        setFollowers(response.data);
      } catch (err) {
        alert("Ops something went wrong");
        console.log("err", err);
      }
    }
    getUser();
  }

  async function unfollow(username) {
    try {
      console.log('username', username)
      await axios.post(`/api/unfollow`, { accessToken, username });
      getFollowing();
    } catch (err) {
      alert("Ops something went wrong");
      console.log("err", err);
    }
  }
  useEffect(() => {
    const { searchUser } = qs.parseUrl(window.location.href).query;
    setSearchUser(searchUser);
    console.log("searchUser", searchUser);
  }, []);

  function getOtherFollowing() {
    if (accessToken && searchUser) {
      async function getUser() {
        try {
          const response = await axios.post(`/api/otherfollowing`, { accessToken, searchUser });
          console.log("User Data", response.data);
          setFollowers(response.data);
        } catch (err) {
          toast.error("Hey did you start the server?");
          console.log("err", err);
        }
      }
      getUser();
    }

  }

  if (searchUser && accessToken) {
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
                <a href="/" className="text-white font-bold text-xl">Zuzie</a>
              </div>
              <div className="flex items-center">
                <button className="bg-red-600 text-white rounded-full px-4 py-2 ml-4" onClick={signOut}>Sign Out</button>
              </div>
            </nav>
            <div className="w-full max-w-7xl mx-auto bg-[#1c1c24] rounded-md shadow-lg border border-gray-200 mt-9">
              <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-white">People You Follows</h2>
                <button className="bg-[#2f2f3e] rounded-md p-4 mt-4 flex flex-row items-center" onClick={getOtherFollowing}>Show following</button>

              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">

                    <tbody className="text-sm divide-y divide-gray-100">
                      {followers && followers.map((follower) => (
                        <tr key={follower.login}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src={follower.avatar_url} width="40" height="40" alt="Alex Shatov" /></div>
                              <Link href={`/People/?searchUser=${follower.login}`} target='_blank'><div className="font-medium text-white">{follower.login}</div></Link>
                            </div>

                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <button onClick={() => unfollow(follower.login)} href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-800 dark:focus:ring-red-900" >UnFollow</button>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left text-white">{follower.html_url}</div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </>
    )
  }
  else if (accessToken && user) {
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
                <a href="/" className="text-white font-bold text-xl">Zuzie</a>
              </div>
              <div className="flex items-center">
                <span className="text-white font-bold mr-2">{user.login}</span>
                <img src={user.avatar_url} alt="Profile Picture" className="rounded-full h-10 w-10 object-cover" />
                <button className="bg-red-600 text-white rounded-full px-4 py-2 ml-4" onClick={signOut}>Sign Out</button>
              </div>
            </nav>
            <div className="w-full max-w-7xl mx-auto bg-[#1c1c24] rounded-md shadow-lg border border-gray-200 mt-9">
              <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-white">People You Follows</h2>
                <button className="bg-[#2f2f3e] rounded-md p-4 mt-4 flex flex-row items-center" onClick={getFollowing}>Show following</button>

              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">

                    <tbody className="text-sm divide-y divide-gray-100">
                      {followers && followers.map((follower) => (
                        <tr key={follower.login}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src={follower.avatar_url} width="40" height="40" alt="Alex Shatov" /></div>
                              <div className="font-medium text-white">{follower.login}</div>
                            </div>

                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <button onClick={() => unfollow(follower.login)} href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-800 dark:focus:ring-red-900" >UnFollow</button>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left text-white">{follower.html_url}</div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

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
                <a href="/" className="text-white font-bold text-xl">Zuzie</a>
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


