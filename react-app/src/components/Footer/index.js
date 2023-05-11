import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
    const devs = [
        ['Christian Ludwell',
        'https://www.linkedin.com/in/christian-ludwell-047b18247/',
        'https://github.com/cludwell'],

        ['Dylan Godeck',
        'https://www.linkedin.com/in/dylan-godeck-188622252/',
        'https://github.com/DylanJG01'],

        ['Christopher MacMaster',
        'https://www.linkedin.com/in/christopher-macmaster-9b05b3113/',
        'https://github.com/Chris-MacMaster'],

        ['Marc Guggenheim',
        'https://www.linkedin.com/in/marc-guggenheim-270165275/',
        'https://github.com/MarcGugg'
        ]]
    return (
        <div className='footer-container'>
            <h3 className='footer-title'>About the creators of Spacey</h3>
            <div className='about-creators'>

            {devs.map((d,i)=> (
            <div className='footer-person'
            key={`footerperson${i}`}>
                <p className='dev-name'
                key={`footerpersonname${i}`}>{devs[i][0]}</p>
                <Link to={{ pathname :`${d[1]}`}}
                target='_blank'>
                <img src='https://i.imgur.com/RqO5mlh.png'
                alt='linkedinlogo'
                className='linkedin-icon'
                key={`linkedin${i}`}></img>
                </Link>
                <Link to={{ pathname:`${d[2]}`}}
                target='_blank'>
                <img src='https://i.imgur.com/KTjeA0w.png'
                alt='githubicon'
                className='github-icon'
                key={`github${i}`}></img>
                </Link>
            </div>

                ))}

            </div>
            <p></p>
        </div>
    )
}
