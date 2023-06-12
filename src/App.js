import Header from './Header';
import SearchItems from './SearchItems';
import AddItem from './AddItem';
import Content from './Content.js';
import Footer from './Footer.js';
import apiRequest from './apiRequest';
import { useState, useEffect } from 'react';


function App() {

  const API_URL = 'http://localhost:3500/items';

  const [items, setItems] = useState([]); // useStateHook - items array
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newItem, setNewItem] = useState(''); // Add new Item
  const [search, setSearch] = useState('');  // Search Item from the list 

  // save local storage inside use effect to be pull back every time the items array change
  useEffect(() => {

    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw ("Did not receive expected data")
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        setFetchError(error)
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => fetchItems(), 1000)
  }, []) // if state of items array change, it will set the item to local storage 

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem]
    setItems(listItems);

    const postOption = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOption);
    if (result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    const listItems = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(listItems);


    const myItem = listItems.filter(item => item.id === id); // return array of listitems

    const updateOption = {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked }) // update only checked property
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOption);
    if (result) setFetchError(result);

  };

  const handleDelete = async (id) => {
    const listItems = items.filter(item => item.id !== id);
    setItems(listItems);

    const deleteOption = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;

    const result = await apiRequest(reqUrl, deleteOption);
    if (result) setFetchError(result);
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
      <main>
        {isLoading && <p style={{ margin: "3rem" }}> loading grocery items... </p>}
        {fetchError && <p style={{ color: "red", margin: "3rem" }}> {`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading &&
          <Content
            items={items.filter(item => ((item.item).toLocaleLowerCase().includes(search.toLocaleLowerCase())))}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
