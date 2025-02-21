import React from 'react'

function Header() {
    return (
        <div className="flex items-center w-full max-w-screen-xl mx-auto mb-10">
            <div className="w-full">
                <div className="card px-4 pt-2 pb-4 shadow-md rounded-lg bg-base-100">
                    <div className="flex items-end justify-between">
                        <div className="flex items-center">
                            <div className="mr-2 relative flex justify-end items-end mt-[-20px]">
                                <img src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-4.jpg" className="w-20 h-20 rounded-full border-4 border-white object-cover" alt="avatar" />
                            </div>
                            <div className="leading-tight">
                                <h2 className="mb-0 text-xl font-bold">Destiny Franks</h2>
                                <p className="mb-0 text-sm text-gray-500">@desphixs</p>
                            </div>
                        </div>
                        <div>
                            <a href="profile-edit.html" className="btn btn-primary btn-sm hidden md:inline-flex items-center">
                                Account Setting <i className='fas fa-gear fa-spin ml-2'></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
