import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

import Login from "../components/login";
import Settings from "../components/settings";

import { useNavigate } from 'react-router-dom';

const links = [
  { name: "Home", to: "/" },
];

export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const logged = localStorage.getItem("token");
  const admin = localStorage.getItem("isAdmin") === "true";
  const [hasTakenQuiz, setHasTakenQuiz] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
	if (logged) {
	  setLoggedIn(logged);
	}
  
	if (admin) {
	  setIsAdmin(admin);
	}
  
	fetch(
	  process.env.REACT_APP_S_HOST +
		":" +
		process.env.REACT_APP_S_PORT +
		"/api/quiz/get_saved_quizzes",
	  {
		headers: {
		  Authorization: "Bearer " + logged,
		},
	  }
	)
	  .then((response) => {
		if (!response.ok) {
		  throw new Error("Could not login");
		} else {
		  return response.json();
		}
	  })
	  .then((data) => {
		console.log("saved quizzes: ", data);
		if (data.length > 0) {
		  setHasTakenQuiz(true);
		} else {
		  setHasTakenQuiz(false);
		  // Navigate to the Quizzes.js page
		  navigate('/quizzes');
		}
	  });
  }, []);

  return (
    <>
      <Disclosure as="nav" style={{ backgroundColor: "rgb(17, 29, 74)" }} className="bg-blue-900 sticky top-0 z-10">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                {/* Mobile Menu Button */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block w-auto" height={50} aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block w-auto" height={50} aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  {/* The Desktop Navbar */}
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                        {links.map((l) => (
                          <Link key={l.name} to={l.to} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            {l.name}
                          </Link>
                        ))}
                        <Link id="quizLink" key="Quizzes" to="/quizzes" className={`text-gray-300 hover:bg-gray-700 ${loggedIn ? 'block' : 'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
                          TSA
                        </Link>
                        <Link key="Clusters" to="/careers" className={`text-gray-300 hover:bg-gray-700 ${hasTakenQuiz? 'block':'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
							Careers
						</Link>
						{/*<Link key="Goals" to="/goals" className={`text-gray-300 hover:bg-gray-700 ${loggedIn? 'block':'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
							Transition Plan
						</Link>*/}
						<a href="https://mindmelders.top/" rel="noopener noreferrer" className={`text-gray-300 hover:bg-gray-700 ${loggedIn? 'block':'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
                  			Transition Plan
                		</a>
						<Link key="Networking" to="/networking" className={`text-gray-300 hover:bg-gray-700 ${loggedIn? 'block':'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
							Networking
						</Link>
						<Link key="Stories" to="/stories" className={`text-gray-300 hover:bg-gray-700 ${loggedIn? 'block':'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
							Stories
						</Link>
						<Link key="Admin Dashboard" to="/admin_dashboard" className={`text-gray-300 hover:bg-gray-700 ${isAdmin? 'block':'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
								Admin Dashboard
						</Link>
                    </div>
                  </div>
                </div>
                <div class="ml-3 relative flex space-x-4">
					{
						loggedIn ? <></> : <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
					}
					<Login btnstyle="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"/>
					{
						loggedIn ? <Settings btnstyle="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"/> : <></>
					}
				</div>
              </div>
            </div>

            {/* Mobile Navbar */}
				<Disclosure.Panel className="sm:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1">
						{links.map((l) => (
							<Disclosure.Button key={l.name} as="a" href={l.to} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
								{l.name}
							</Disclosure.Button>
						))}
						<Disclosure.Button key="Quizzes" as="a" href="/quizzes" className={`text-gray-300 hover:bg-gray-700 ${loggedIn? 'block':'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
							TSA
						</Disclosure.Button>
						<Disclosure.Button key="Clusters" as="a" href="/careers" className={`text-gray-300 hover:bg-gray-700 ${loggedIn? 'block':'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
							Careers
						</Disclosure.Button>
						{/*<Disclosure.Button key="Goals" as="a" href="/goals" className={`text-gray-300 hover:bg-gray-700 ${loggedIn? 'block':'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
							Transition Plan
						</Disclosure.Button>*/}
						<a href="https://mindmelders.top/" rel="noopener noreferrer" className={`text-gray-300 hover:bg-gray-700 ${loggedIn? 'block':'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
                  			Transition Plan
                		</a>
						<Disclosure.Button key="Networking" to="/networking" className={`text-gray-300 hover:bg-gray-700 ${loggedIn? 'block':'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
							Networking
						</Disclosure.Button>
						<Disclosure.Button key="Stories" as="a" href="/stories" className={`text-gray-300 hover:bg-gray-700 ${loggedIn? 'block':'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
							Stories
						</Disclosure.Button>
						<Disclosure.Button key="Admin Dashboard" as="a" href="/admin_dashboard" className={`text-gray-300 hover:bg-gray-700 ${isAdmin? 'block':'hidden'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
							Admin Dashboard
						</Disclosure.Button>
					</div>
				</Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}