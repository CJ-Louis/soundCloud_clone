import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSong } from "../../store/songs";

const CreateSongForm = ({ hideForm }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [albumId, setAlbumId] = useState('');


  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateUrl = (e) => setUrl(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateAlbumId = (e) => setAlbumId(e.target.value);




  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      url,
      imageUrl,
      albumId,
    };
    console.log('This is albumId:',albumId === null)
    let createdSong = await dispatch(createSong(payload))
    console.log('This is the song we just created',createdSong)
    if (createdSong) {
      history.push(`/songs/${createdSong.id}`);
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push('/songs')
    hideForm();
  };

  return (
    <section className="new-form-holder centered middled">
      <form onSubmit={handleSubmit}>
        <input
          type="string"
          placeholder="Title"
          required
          value={title}
          onChange={updateTitle} />
        <input
          type="string"
          placeholder="Description"
          required
          value={description}
          onChange={updateDescription} />
        <input
          type="text"
          placeholder="Audio Url"
          required
          value={url}
          onChange={updateUrl} />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl} />
        <input
          type="text"
          placeholder="Album"
          value={albumId}
          onChange={updateAlbumId} />
        <button type="submit">Post song to SpoofCloud</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default CreateSongForm;