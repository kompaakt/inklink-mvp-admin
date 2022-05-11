import firebase from 'firebase/compat/app';

import { Fragment, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { MenuAlt2Icon, XIcon } from '@heroicons/react/outline';
import { AuthContext } from '../context/AuthProvider';
import { HeaderSideMenu } from './HeaderSideMenu';
import { Search } from './Search';
import Logo from '../assets/logo.svg';
import { Sidebar } from './Sidebar';

const signOut = () => {
  firebase.auth().signOut();
};

export function Layout({ children }) {
  const { userInfo, isUserInfoLoading } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isUserInfoLoading) return <div>loading....</div>;

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <Search />
            <HeaderSideMenu userInfo={userInfo} />
            <div className="items-center flex ml-5">
              <button
                type="button"
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-gray-600 bg-gray-50 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  signOut();
                }}
              >
                Выход
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
