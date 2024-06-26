import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../images/LRO_logo2.png";
import AVT from "../../images/LRO_logo.png";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContextProvider";
import InputSearch from "../Search/InputSearch.jsx";

const navigation = [
  { name: "Trang Chủ", href: "/", current: true },
  { name: "Tài Liệu", href: "/tailieu", current: false },
  { name: "Bài Viết", href: "/baiviet", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  const [isOpen, setIsOpen] = useState(1);
  const LinkTo = useNavigate();
  const { user } = useContext(ProductContext);
  let id = user?.userId;
  // console.log(id);
  const href = window.location.href;
  useEffect(() => {
    if (href.includes("tailieu")) {
      setIsOpen(2);
    } else if (href.includes("baiviet")) {
      setIsOpen(3);
    } else {
      setIsOpen(1);
    }
    // console.log(href);
  }, [href]);
  const handlerLogout = () => {
    Swal.fire({
      title: "Bạn muốn đăng xuất",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đăng xuất ngay",
      cancelButtonText: "Huỷ",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Đã Đăng Xuất", "Đăng Xuất Thành Công", "success");
        localStorage.clear();
        // navigation("/");
        // window.location.href = "/";
        window.location = "/";
      }
    });
   
  };

  return (
    <>
      <Disclosure as="nav" className="bg-blue-500 text-black ">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={Logo}
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src={Logo}
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link
                        onClick={() => setIsOpen(1)}
                        to="/"
                        className={`${
                          isOpen === 1
                            ? "bg-blue-600 text-white"
                            : "text-black hover:bg-blue-600 hover:text-white"
                        }  px-3 py-2 rounded-md text-sm font-medium`}
                      >
                        Trang Chủ
                      </Link>
                      <Link
                        onClick={() => setIsOpen(1)}
                        to="/tailieu"
                        className={`${
                          isOpen === 2
                            ? "bg-blue-600 text-white"
                            : "text-black hover:bg-blue-600 hover:text-white"
                        }  px-3 py-2 rounded-md text-sm font-medium`}
                      >
                        Tài Liệu
                      </Link>
                      <Link
                        onClick={() => setIsOpen(1)}
                        to="/baiviet"
                        className={`${
                          isOpen === 3
                            ? "bg-blue-600 text-white"
                            : "text-black hover:bg-blue-600 hover:text-white"
                        }  px-3 py-2 rounded-md text-sm font-medium`}
                      >
                        Bài Viết
                      </Link>

                      {/* {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))} */}
                    </div>
                  </div>
                </div>

                {/* SEARCH  */}
                <div class="relative hidden md:block">
                  <InputSearch />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {user && user?.userId ? (
                    <>
                      <Menu as="div" className="relative ml-3 hidden md:block">
                        <div>
                          <Menu.Button>
                            <button
                              type="button"
                              className="rounded-full bg-green-500 p-1 text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <span className="sr-only flex">
                                View notifications
                              </span>

                              <span className="h-6 w-auto flex">
                                <span className="mx-1">Đăng Tải</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                  />
                                </svg>
                              </span>
                            </button>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"

                            // className="relative right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {user && user?.userId ? (
                              <>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/tailieu/create"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Đăng Tài Liệu
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/baiviet/create"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Đăng Bài Viết
                                    </Link>
                                  )}
                                </Menu.Item>
                                {/* <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to={"/blogs/create"}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Đăng Blogs
                                    </Link>
                                  )}
                                </Menu.Item> */}
                              </>
                            ) : (
                              <>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/login"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Đăng Nhập
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/register"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Đăng Ký
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      href="#"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Hướng Dẫn
                                    </Link>
                                  )}
                                </Menu.Item>
                              </>
                            )}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        type="button"
                        className="rounded-md bg-green-400 p-1 text-white
                         hover:text-white hover:bg-green-600/60 hover:border-t-2 hover:border-b-2 hover:rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only flex">View notifications</span>
                        {/* <a className="h-6 w-6" aria-hidden="true" /> */}
                        <span className="h-6 w-auto flex">
                          <span className="mx-1">Đăng Nhập</span>
                        </span>
                      </Link>
                      <NavLink
                        to="/register"
                        type="button"
                        className="p-1 mx-2 text-white border-t-2 border-b-2 transition ease-in-out
                          hover:text-blue-500 hover:bg-white hover:rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only flex">View notifications</span>
                        {/* <a className="h-6 w-6" aria-hidden="true" /> */}
                        <span className="h-6 w-auto flex">
                          <span className="mx-1">Đăng Ký</span>
                        </span>
                      </NavLink>
                    </>
                  )}
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3 z-200">
                    <div>
                      <Menu.Button className="flex rounded-full shadow-lg shadow-blue-700/10 bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user?.avatar ? user?.avatar : AVT}
                          alt=""
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {user && user?.userId ? (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={`/u/${id}`}
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Trang Cá Nhân
                                </Link>
                              )}
                            </Menu.Item>
                            {/* <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/tailieu/create"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Đăng Tài Liệu
                                </Link>
                              )}
                            </Menu.Item> */}
                            {/* <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/baiviet/create"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Đăng Bài Viết
                                </Link>
                              )}
                            </Menu.Item> */}
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={"/me/drafts"}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Quản Lý Nội Dung
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={`/u/edit/${user?.userId}`}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Cập nhật Tài Khoản
                                </Link>
                              )}
                            </Menu.Item>
                            {user?.form == "LRO" ? (
                              <>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to={`/u/edit/pass/${user?.userId}`}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Thay đổi mật khẩu
                                    </Link>
                                  )}
                                </Menu.Item>
                              </>
                            ) : (
                              ""
                            )}
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  onClick={handlerLogout}
                                  id="handlerLogout"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  )}
                                >
                                  Đăng Xuất
                                </span>
                              )}
                            </Menu.Item>
                          </>
                        ) : (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/login"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Đăng Nhập
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/register"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Đăng Ký
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Hướng Dẫn
                                </Link>
                              )}
                            </Menu.Item>
                          </>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default Header;
