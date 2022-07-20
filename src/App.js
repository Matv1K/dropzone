import { useState, useRef, useEffect } from 'react';

import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
      setPreview(reader.result);
      }
      reader.readAsDataURL(image)
    } else {
      setPreview('');
    }
  }, [image])

  const handleClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  }

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.substr(0, 5) === 'image') {
      setImage(file);
    } else {
      setImage(null)
    }

  }

  const removeHandler = (e) => {
    e.preventDefault();
    setImage(null);
  }

  return (
    <div>
      <form>
      {preview ? <div className='block' style={{
        backgroundImage: `url(${preview})`
      }}>
        <button className='remove' onClick={removeHandler}>remove</button>
      </div> : <button className="wrapper" onClick={handleClick} >Add image</button>}
        <input type='file' 
        style={{display: 'none'}} 
        ref={fileInputRef} 
        onChange={handleChange} 
        accept="image/*"/>
      </form>
    </div>
  );
}

export default App;
