import { useState } from 'react'
import { BsBrightnessHigh, BsBrightnessHighFill, BsBuilding, BsFillPinMapFill, BsLink45Deg, BsSearch, BsTwitter } from 'react-icons/bs'
import style from '../styles/Home.module.scss'


export default function Home () {
  const date = String( new Date().toLocaleDateString() )
  const [light, setLight] = useState( false )

  function handleOnChangeTheme () {
    setLight( !light )
  }

  return (
    <div className={style.container}>
      <header>
        <h1>DevFinder</h1>
        <div>
          <button onClick={handleOnChangeTheme}>Light</button>
          {light ? <BsBrightnessHigh size={24} /> : <BsBrightnessHighFill size={24} />}
        </div>
      </header>
      <section className={style.searchContent}>
        <BsSearch size={24} />
        <input type="text" placeholder='Search GitHub username...' />
        <button>Search</button>
      </section>
      <div className={style.content}>
        <div >
          <img src="https://i.stack.imgur.com/frlIf.png" alt="" />
        </div>
        <div className={style.userInformation}>
          <header>
            <section>
              <h2>Anderson Andrade</h2>
              {date}
            </section>
            <h3>something</h3>
            <p>this profile has no bio</p>
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
                <td>10</td>
                <td>10</td>
                <td>10</td>
              </tr>
            </tbody>
          </table>
          <div className={style.links}>
            <span><BsFillPinMapFill />  Brazil</span>
            <span><BsLink45Deg />  Brazil</span>
          </div>
          <div className={style.links}>
            <span><BsTwitter />  Brazil</span>
            <span><BsBuilding />  Brazil</span>
          </div>
        </div>
      </div>
    </div>
  )
}