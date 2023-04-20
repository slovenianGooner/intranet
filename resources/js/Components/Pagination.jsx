import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid'
import {Link} from "@inertiajs/react";
import {Fragment} from "react";
import {classNames} from "@/Hooks/useClassNames";

export default function Pagination({data, query}) {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex flex-1 justify-between sm:hidden">
                <div>
                    {data.prev_page_url && (
                        <Link
                            href={data.prev_page_url}
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            Previous
                        </Link>
                    )}
                </div>
                <div>
                    {data.next_page_url && (
                        <Link
                            href={data.next_page_url}
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            Next
                        </Link>
                    )}
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{data.from}</span> to <span
                        className="font-medium">{data.to}</span> of{' '}
                        <span className="font-medium">{data.total}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {data.links.map((link, index) => (
                                <Link href={link.url} key={link.label}
                                      className={
                                          classNames(
                                              link.active ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                  : 'relative inline-flex items-center bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                                              index === 0 ? 'rounded-l-md' : '',
                                              index === data.links.length - 1 ? 'rounded-r-md' : ''
                                          )
                                      }
                                      dangerouslySetInnerHTML={{__html: link.label}}>
                                </Link>
                            )
                        )}
                    </nav>
                </div>
            </div>
        </div>
    )
}
