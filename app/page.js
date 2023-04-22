'use client'
import React, { useState, useEffect } from 'react';
import './page.css';


export default function Home() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const body = {title, author, genre}
    try {
      const response = await fetch("/api/hello", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
    } catch(error) {
      console.log("There was an error", error)
    }
    setTitle('');
    setAuthor('')
    setGenre('')
    window.location.reload()
  }

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <main className="main">
      <form>
        <div className='form-div'>
          <label className='label'>Book Title: </label>
          <input 
            className='input' 
            type="text" 
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className='form-div'>
          <label className='label'>Author: </label>
          <input 
            className='input' 
            type="text" 
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div className='form-div'>
          <label className='label'>Genre: </label>
          <input 
            className='input' 
            type="text" 
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          />
        </div>
        <button type='submit' onClick={handleSubmit}>Submit</button>
      </form>

      <div>
        { data.length > 0 ? (
          <div className='list-div'>
            {data.map(data => (
              <div className='list' key={data.id}>
              <ul>
                <li >{data.bookTitle}</li>
                <li >{data.bookAuthor}</li>
                <li >{data.bookGenre}</li>
              </ul>
              </div>
            ))}
          </div>
        ) : (<p>Loading..</p>) }
      </div>
      

      
    </main>
  )
}
