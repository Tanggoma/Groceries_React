import Header from './Header';
import SearchItems from './SearchItems';
import AddItem from './AddItem';
import Content from './Content.js';
import Footer from './Footer.js';
import { useState, useEffect } from 'react';


function App() {

  // useStateHook - items array
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('Shoppinglist')) || []);

  // save local storage inside use effect to be pull back every time the items array change
  useEffect(() => {
    localStorage.setItem('Shoppinglist', JSON.stringify(items)); //current state
  }, [items]) // if state of items array change, it will set the item to local storage 

  // Add new Item
  const [newItem, setNewItem] = useState('');

  // Search Item from the list 
  const [search, setSearch] = useState('');


  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem]
    setItems(listItems);
  }

  const handleCheck = (id) => {
    const listItems = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter(item => item.id !== id);
    setItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    // if there is new item ,add item 
    addItem(newItem) // new state
    setNewItem(''); // to clear add items
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItems
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={items.filter(item => ((item.item).toLocaleLowerCase().includes(search.toLocaleLowerCase())))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
