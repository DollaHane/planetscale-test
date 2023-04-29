'use client'
import React, { useState, useEffect } from 'react';
import './page.css';



export default function Home() {

  // Form State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [imageUrl, setImageUrl] = useState('')

  // Cloudinary State
  const [imageSrc, setImageSrc] = useState('')
  const [uploadData, setUploadData] = useState('')

  // PlanetScale State
  const [data, setData] = useState([]);
  const [images, setImages] = useState([])



  // ********** Cloudinary Code (FETCH) **********
  useEffect(() => {
    fetch('/api/cloud')
      .then(response => response.json())
      .then(images => {
        setImages(images);
      })
      .catch(error => console.error(error));
  }, []);

  console.log(images)


  // ********** Cloudinary Code (UPLOAD) **********
  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function(onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleUploadSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

    const formData = new FormData();

    for ( const file of fileInput.files ) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my_uploads');

    const data = await fetch('https://api.cloudinary.com/v1_1/dmdcioxqc/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }



  // ********** Form Data Code **********
  const handleSubmit = async(event) => {
    event.preventDefault();
    const image = imageUrl
    const body = {title, author, genre, image}
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
      })
      .catch(error => console.error(error));
  }, []);


  // ********** Display **********
  return (
    <main className="main">

      <h2>Welcome!</h2>
      <h4>This is a book gallery powered by PlanetScale and Cloudinary.</h4>
      <p className='desc'>Feel free to upload a cover of your favourite book and add it to the list.</p>

      <form 
          method="post" 
          onChange={handleOnChange} 
          onSubmit={handleUploadSubmit} 
          className='form-body'>
        <div className='form-div'>
            <label className='label'>Upload Book Cover: </label>
            <input
              className='input'
              type='file'
              name='file'
            />
          </div>
          <img src={imageSrc} className='image-prev' alt="Book cover"/>
            
            {imageSrc && !uploadData && (
              <p>
                <button>Upload Files</button>
              </p>
            )}

            {uploadData && (<p>Upload Successful!</p>)}
      </form>

      <form onSubmit={handleSubmit} className='form-body'>
        <div className='form-div'>
          <label className='label'>Book Title: </label>
          <input
            className='input'
            type='text'
            value={title}
            required="required"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className='form-div'>
          <label className='label'>Author: </label>
          <input
            className='input'
            type='text'
            value={author}
            required="required"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div className='form-div'>
          <label className='label'>Genre: </label>
          <input
            className='input'
            type='text'
            value={genre}
            required="required"
            onChange={(event) => setGenre(event.target.value)}
          />
        </div>

        <div className='form-div'>
          <label className='label'>Book Cover: </label>
          <select 
            value={imageUrl} 
            onChange={(event) => setImageUrl(event.target.value)} 
            required="required"
            className='input'>

            {Array.isArray(images.resources) && images.resources.map(image => (
              <option className='input' key={image.asset_id} value={image.url}>{image.public_id}</option>
            ))}

          </select>
        </div>
        
        <button type='submit'>Submit</button>
      </form>

      <div className='books'>
      <h3>Book List:</h3>
        { data.length > 0 ? (

          <div className='gallery-div'>
            {data.map(data => (
              <div className='gallery-cont' key={data.id}>
                <img src={data.bookImage} className='gallery-img' alt="Book cover"></img>
                <div className='list'>
                  <p>Title: {data.bookTitle}</p>
                  <p>Author: {data.bookAuthor}</p>
                  <p>Genre: {data.bookGenre}</p>
                </div>
              </div>
            ))}
          </div>

        ) : (
        
        <p>Loading..</p>
        
        ) }
      </div>

      <div className='gallery'>
        <h3>Image Gallary:</h3>
        <div className='gallery-div'>
          {Array.isArray(images.resources) && images.resources.map(image => (
            <div className='gallery-cont' key={image.asset_id}>
              <img src={image.url} key={image.asset_id} alt="Book cover" className='gallery-img'/>
              <p key={image.asset_id} className='gallery-id'>{image.public_id}</p>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}


/* 
// Convert Image to Base64..
  function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      const base64 = reader.result;
      console.log(base64);
      // set the state of image to the base64 string
      setImage(JSON.stringify(base64));
    };
    reader.onerror = function(error) {
      console.log('Error: ', error);
    };
  }

  console.log(image);
*/