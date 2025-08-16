import React, { useState, useEffect } from 'react'
import { fetchInventory } from '../utils/inventoryProvider'
import DENOMINATION from '../utils/currencyProvider'
import Image from './Image'
import Link from 'next/link'
import { slugify } from '../utils/helpers'
import { FaTimes } from 'react-icons/fa'

function ViewInventory() {
  const [inventory, setInventory] = useState([])
  const [currentItem, setCurrentItem] = useState({})
  const [editingIndex, setEditingIndex] = useState(null)

  useEffect(() => {
    loadInventory()
  }, [])

  const loadInventory = async () => {
    const inventoryData = await fetchInventory()
    setInventory(inventoryData)
  }

  const editItem = (item, index) => {
    setEditingIndex(index)
    setCurrentItem(item)
  }

  const saveItem = async (index) => {
    const updatedInventory = [...inventory]
    updatedInventory[index] = currentItem
    // update item in database
    setEditingIndex(null)
    setInventory(updatedInventory)
  }

  const deleteItem = async (index) => {
    const updatedInventory = [
      ...inventory.slice(0, index),
      ...inventory.slice(index + 1)
    ]
    setInventory(updatedInventory)
  }

  const onChange = (event) => {
    const updatedCurrentItem = {
      ...currentItem,
      [event.target.name]: event.target.value,
    }
    setCurrentItem(updatedCurrentItem)
  }

  return (
    <div>
      <h2 className="text-3xl">Inventory</h2>
      {inventory.map((item, index) => {
        const isEditing = editingIndex === index
        if (isEditing) {
          return (
            <div className="border-b py-10" key={item.id}>
              <div className="flex items-center">
                <Link href={`/product/${slugify(item.name)}`} aria-label={item.name}>
                  <Image className="w-32 m-0" src={item.image} alt={item.name} />
                </Link>
                <input
                  onChange={onChange}
                  className="ml-8 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={currentItem.name || ''}
                  placeholder="Item name"
                  name="name"
                />
                <div className="flex flex-1 justify-end items-center">
                  <p className="m-0 text-sm mr-2">In stock:</p>
                  <input
                    onChange={onChange}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={currentItem.currentInventory || ''}
                    name="currentInventory"
                    placeholder="Item inventory"
                  />
                  <input
                    onChange={onChange}
                    className="ml-16 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={currentItem.price || ''}
                    name="price"
                    placeholder="Item price"
                  />
                </div>
                <div
                  role="button"
                  onClick={() => saveItem(index)}
                  className="m-0 ml-10 text-gray-900 text-s cursor-pointer"
                >
                  <p className="text-sm ml-10 m-0">Save</p>
                </div>
              </div>
            </div>
          )
        }
        return (
          <div className="border-b py-10" key={item.id}>
            <div className="flex items-center">
              <Link href={`/product/${slugify(item.name)}`} aria-label={item.name}>
                <Image className="w-32 m-0" src={item.image} alt={item.name} />
              </Link>
              <Link href={`/product/${slugify(item.name)}`}>
                <p className="m-0 pl-10 text-gray-600 text-sm">{item.name}</p>
              </Link>
              <div className="flex flex-1 justify-end">
                <p className="m-0 pl-10 text-gray-900 text-sm">
                  In stock: {item.currentInventory}
                </p>
                <p className="m-0 pl-20 text-gray-900 font-semibold">
                  {DENOMINATION + item.price}
                </p>
              </div>
              <div className="flex items-center m-0 ml-10 text-gray-900 text-s cursor-pointer">
                <FaTimes onClick={() => deleteItem(index)} />
                <p
                  role="button"
                  onClick={() => editItem(item, index)}
                  className="text-sm ml-10 m-0"
                >
                  Edit
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ViewInventory
