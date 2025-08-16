import React, { useState } from 'react'
import AddInventory from './formComponents/AddInventory'
import ViewInventory from './ViewInventory'

function Inventory({ signOut }) {
  const [viewState, setViewState] = useState('view')

  const toggleViewState = (newViewState) => {
    setViewState(newViewState)
  }

  return (
    <div>
      <div className="flex my-6">
        <p
          role="button"
          className="mr-4 cursor-pointer hover:text-primary"
          onClick={() => toggleViewState('view')}
        >
          View Inventory
        </p>
        <p
          role="button"
          className="cursor-pointer hover:text-primary"
          onClick={() => toggleViewState('add')}
        >
          Add Item
        </p>
      </div>
      {viewState === 'view' ? <ViewInventory /> : <AddInventory />}
      <button
        onClick={signOut}
        className="mt-4 bg-primary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Sign Out
      </button>
    </div>
  )
}

export default Inventory
