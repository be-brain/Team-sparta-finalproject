import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

export default function FoodCategory() {
    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium hover:bg-main hover:text-white focus:outline-none gap-1">
                        음식종류
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-3 h-3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
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
                    <Menu.Items className="absolute left-0 mt-2 origin-top-right bg-white shadow-lg focus:outline-none z-50">
                        <div className="flex flex-col">
                            <Menu.Item>
                                <Link
                                    legacyBehavior
                                    href={`/searchPage/밥&도시락&면`}
                                >
                                    <a className="w-full px-2 py-2 text-sm text-gray-900 hover:bg-hoverGray hover:text-main">
                                        밥/도시락/면
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link
                                    legacyBehavior
                                    href={`/searchPage/국&탕&찌개`}
                                >
                                    <a className="px-2 py-2 text-sm text-gray-900 hover:bg-hoverGray hover:text-main">
                                        국/탕/찌개
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link
                                    legacyBehavior
                                    href={`/searchPage/구이&볶음&찜`}
                                >
                                    <a className="px-2 py-2 text-sm text-gray-900 hover:bg-hoverGray hover:text-main">
                                        구이/볶음/찜
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link
                                    legacyBehavior
                                    href={`/searchPage/튀김류`}
                                >
                                    <a className="px-2 py-2 text-sm text-gray-900 hover:bg-hoverGray hover:text-main">
                                        튀김류
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link
                                    legacyBehavior
                                    href={`/searchPage/베이커리&디저트`}
                                >
                                    <a className="px-2 py-2 text-sm text-gray-900 hover:bg-hoverGray hover:text-main">
                                        베이커리/디저트
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link
                                    legacyBehavior
                                    href={`/searchPage/음료&주류`}
                                >
                                    <a className="px-2 py-2 text-sm text-gray-900 hover:bg-hoverGray hover:text-main">
                                        음료/주류
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link
                                    legacyBehavior
                                    href={`/searchPage/식단&건강관리`}
                                >
                                    <a className="px-2 py-2 text-sm text-gray-900 hover:bg-hoverGray hover:text-main">
                                        식단/건강관리
                                    </a>
                                </Link>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}