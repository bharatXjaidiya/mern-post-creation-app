import React from 'react'
import "../styles/createPost.scss"
import upload from "../../../assets/upload-file.jpg"
import usePost from '../hooks/usePost'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Loading from '../../../shared/Loading'


const CreatePost = () => {

  const { handleCreatePost , loading } = usePost();
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const postImageInputFieldRef = useRef(null)

  function handleChange(e) {
    if (e.target.name === "caption") {
      setCaption(e.target.value);
    }
    else if (e.target.name === "description") {
      setDescription(e.target.value)
    }
  }


  async function submitPost(e) {
    e.preventDefault();
    try{
      const image = postImageInputFieldRef.current.files[0];
      await handleCreatePost(caption, description, image);
      toast("post created successfully.")
      navigate("/")
    }
    catch(err){
      toast.error(err.response?.data?.message || "register failed. Please try again.");
    }
  }

  if(loading){
    return <Loading text='Loading please wait' />
  }

  return (
    <main onSubmit={(e) => { submitPost(e) }} className='create-post'>

      <div className="create-container">
        <h1>Create Post</h1>
        <form >
          <label htmlFor='file'> {preview ? <img src={preview} alt="preview" /> : <img src={upload} alt="" />}</label>
          <input onChange={(e) => {
            const file = e.target.files[0];

            if (file) {
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
           ref={postImageInputFieldRef} hidden type="file" name="imageUrl" id="file" />
          <input onChange={(e) => { handleChange(e) }} type="text" name='caption' id='caption' placeholder='Caption' value={caption} />
          <input onChange={(e => handleChange(e))} type="text" name='description' id='description' placeholder='Description' value={description} />

          <button>Post</button>

        </form>
      </div>

    </main>
  )
}

export default CreatePost
