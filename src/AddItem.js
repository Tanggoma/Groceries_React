import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react';

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
    const inputRef = useRef(); // use reference hook to move focus from add button to add item 

    return (
        <form className='addForm' onSubmit={handleSubmit}>
            <label htmlFor="addItem"> Add Item</label>
            <input
                autoFocus
                ref={inputRef}
                type="text"
                id='addItem'
                placeholder='add item'
                required
                value={newItem} // set state for new item added 
                onChange={(e) => setNewItem(e.target.value)}

            />
            <button
                type='submit'
                aria-label='add Item'
                onClick={() => inputRef.current.focus()}
            >
                <FaPlus />
            </button>
        </form>
    )
}

export default AddItem