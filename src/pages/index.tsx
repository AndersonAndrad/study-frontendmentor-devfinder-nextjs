import { BsBrightnessHigh, BsBrightnessHighFill, BsBuilding, BsFillPinMapFill, BsLink45Deg, BsSearch, BsTwitter } from 'react-icons/bs'

import { ApiGitHub } from '../services/api.services'
import style from '../styles/Home.module.scss'
import { useState } from 'react'
import { version } from '../../package.json'

type UserInformation = {
  photoUrl: string
  company: string
  location: string
  name: string
  bio: string
  quantityRepositories: number
  followers: number
  following: number
  updatedAt: string
  profileUrl: string
  twitterUserName: string
  blog: string
}

type ResponseGitHubUserInformation = {
  data: {
    avatar_url: string
    company: string
    location: string
    name: string
    bio: string
    public_repos: number
    updated_at: string
    twitter_username: string
    followers: number
    following: number
    html_url: string
    blog: string
  }
}

export default function Home () {
  const [light, setLight] = useState( false )
  const [userName, setUserName] = useState( '' )
  const [userInformation, setUserInformation] = useState<UserInformation>( {} as UserInformation )
  const [userNotFound, setUserNotFound] = useState( false )

  async function handleGetUserInformation () {
    await ApiGitHub.get( `/users/${userName}` ).then( ( { data }: ResponseGitHubUserInformation ) => {
      const userInformationFormatted: UserInformation = {
        photoUrl: data.avatar_url,
        company: data.company,
        location: data.location,
        name: data.name,
        bio: data.bio,
        quantityRepositories: data.public_repos,
        followers: data.followers,
        following: data.following,
        updatedAt: new Date( data.updated_at ).toLocaleDateString( 'eng-US', { day: '2-digit', month: 'long', year: 'numeric' } ),
        profileUrl: data.html_url,
        twitterUserName: data.twitter_username,
        blog: data.blog
      }

      setUserNotFound( false )
      setUserName( '' )
      setUserInformation( userInformationFormatted )

    } ).catch( () => {

      setUserNotFound( true )

    } )
  }

  function handleOnChangeTheme () {
    setLight( !light )
  }

  return (
    <div className={style.container}>
      <header>
        <h1>DevFinder</h1>
        <span>{version}</span>
        <div>
          <button onClick={handleOnChangeTheme}>Light</button>
          {light ? <BsBrightnessHigh size={24} /> : <BsBrightnessHighFill size={24} />}
        </div>
      </header>
      <section className={style.searchContent}>
        <BsSearch size={24} />
        <input type="text" placeholder='Search GitHub username...' value={userName} onChange={event => { setUserName( event.target.value ) }} onKeyDown={event => { event.key === 'Enter' && handleGetUserInformation() }} />
        <button onClick={handleGetUserInformation}>Search</button>
      </section>
      {
        userInformation.name && userNotFound === false ? (
          <div className={style.content}>
            <div >
              <img src={userInformation.photoUrl} alt={userInformation.profileUrl} />
            </div>
            <div className={style.userInformation}>
              <header>
                <section>
                  <h2>{userInformation.name}</h2>
                  {userInformation.updatedAt}
                </section>
                <h3>{userInformation.blog ? userInformation.blog : 'No blog'}</h3>
                <p>{userInformation.bio}</p>
              </header>
              <table>
                <thead>
                  <tr>
                    <th>Repositories</th>
                    <th>Followers</th>
                    <th>Following</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{userInformation.quantityRepositories}</td>
                    <td>{userInformation.followers}</td>
                    <td>{userInformation.following}</td>
                  </tr>
                </tbody>
              </table>
              <div className={style.links}>
                <span><BsFillPinMapFill /> {userInformation.location}</span>
                <span><BsLink45Deg />  <a href={userInformation.profileUrl} target="_blank" rel="noreferrer">{userInformation.profileUrl}</a></span>
              </div>
              <div className={style.links}>
                <span><BsTwitter />  {userInformation.twitterUserName ? userInformation.twitterUserName : 'No profile'}</span>
                <span><BsBuilding />  {userInformation.company}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={style.userNotFound}>
            <h2>No user found</h2>
          </div>
        )
      }
    </div>
  )
}