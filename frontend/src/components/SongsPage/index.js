import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as songActions from '../../store/songs'
import playdasong from '../../SiteImages/playdasong.png'
import wavform from '../../SiteImages/wavform.png'
import maface from '../../SiteImages/maface.jpg'
import gitlogo from '../../SiteImages/gitlogo.png'
import linked from '../../SiteImages/linked.png'
import './songs.css'


function SongsPage({setPlayingSong}) {
  const dispatch = useDispatch();

  const songs = useSelector(state => {
    return state.songs.songlist;
  });
  const user = useSelector(state => {
    return state.session.user
  });


  useEffect(() => {
    dispatch(songActions.retrieveSongs())
  },[dispatch])

  const songList = (songArr) => {
    console.log(songArr)
    let list = songArr.map(song =>{
        return(
        <li key={song.id} className='songcard'>
            <span>
            <NavLink to={`/songs/${song.id}`}>
              <img className='imgs' src={song.imageUrl} alt='image not found' />
            </NavLink>

                <img className='playbutton' src={playdasong} alt='playbutton' onClick={(e) => setPlayingSong(song?.url) }/>
            </span>
        <div>
            <span>
                <NavLink to={`/songs/${song.id}`} className='songlink'>{song.title}</NavLink>
            </span>
            <p className="artisttxt">
              {song?.User.username}
            </p>
            <img className="wavform" src={wavform} alt="wavform" />
        </div>
        </li>
        )
    })

    return list
  }

  if (!songs){
    return <div>Loading</div>
  }

  let userCreate;
  if (!user) {
   userCreate = ( <div>Sign up or log in in order to produce some songs</div>)
  }
  else {
    userCreate = (<i class="fa-solid fa-cloud-arrow-up">
      <NavLink to={`/songs/create`} className='edittext'> Make a new song</NavLink>
      </i>)

  }

  return (
    <div className="songlistdivsongs">
        <div className="shameless">
          <div className="plug">
            <text className="selfpat">Here is our featured artist</text>
            <img className='maface' src={maface} alt='CJ LEWIS' />
            <NavLink to='my-git' className='github'>
              <img className="gitlitlogo" src={gitlogo}/>
              <p className="gitlittle">Click here to check out my github</p>
            </NavLink>
            <NavLink to='my-linked' className='github'>
              <img className="gitlitlogo" src={linked}/>
              <p className="gitlittle">Click here to check out my LinkedIn</p>
            </NavLink>
          </div>
        </div>
        <div className="topimg homie"></div>
        <h1 className="songtop">Top Songs</h1>
        <ul className="songs">
            {songList(songs)}
        </ul>
        <div>
        <span>
            {/* {userCreate} */}
        </span>
        </div>
    </div>
  );
}

export default SongsPage;
