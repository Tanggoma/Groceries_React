import Header from './Header';
import SearchItems from './SearchItems';
import AddItem from './AddItem';
import Content from './Content.js';
import Footer from './Footer.js';
import { useState } from 'react';


function App() {

  // useStateHook - items array
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('Shoppinglist')));

  // Add new Item
  const [newItem, setNewItem] = useState('');

  // Search Item from the list 
  const [search, setSearch] = useState('');

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    //store new array into local storage
    //map checked item and set new item into new array listItems
    localStorage.setItem('Shoppinglist', JSON.stringify(newItems));
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem]
    setAndSaveItems(listItems);
  }

  const handleCheck = (id) => {
    const listItems = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    setAndSaveItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter(item => item.id !== id);
    setAndSaveItems(listItems);
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
