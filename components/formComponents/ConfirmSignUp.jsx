import React, { useState } from 'react'

function ConfirmSignUp({ confirmSignUp }) {
  const [formData, setFormData] = useState({
    username: '', 
    authcode: ''
  })

  const onChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div>
      <h3 className="py-4">Sign Up</h3>
      <div className="flex flex-1 justify-center">
        <div className="w-full max-w-144">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                onChange={onChange}
                name="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="authcode">
                Authentication Code
              </label>
              <input
                onChange={onChange}
                name="authcode"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="authcode"
                type="text"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => confirmSignUp(formData)}
                className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Confirm Sign Up
              </button>
              <a className="inline-block align-baseline font-bold text-sm" href="#">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmSignUp
