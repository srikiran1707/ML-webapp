import React from 'react'
import ProfileSummary from './components/ProfileSummary'

const AboutUs = () => {
  return (
    <div className='container'>
      <div className='glassHeader'>
        <h2 className='header'>Developed by</h2>
      </div>
      <div className='multiGlass'>
        <div className='glassAboutUs'>
          <div className='img'>
            <img src={require(`./images/samarth.jpg`)} alt={'anon'} />
          </div>
          <ProfileSummary
            name={'Samarth Hari'}
            title={'Java and AWS Developer'}
            summary={
              'Working on prime video for their global sports feature control capabilities. Specifically using java and many aws services to setup a globally consistent control infrastructure .'
            }
          />
        </div>
        <div className='glassAboutUs'>
          <div className='img'>
            <img src={require(`./images/prathik.jpg`)} alt={'anon'} />
          </div>
          <ProfileSummary
            name={'Prathik Raman'}
            title={'Java Developer'}
            summary={
              'Working on a web based integrated project for managing business data and life cycle compliance of a trading community. Resolved many UI bugs, made enhancements for better user experience .'
            }
          />
        </div>
        <div className='glassAboutUs'>
          <div className='img'>
            <img src={require(`./images/harsha.jpg`)} alt={'anon'} />
          </div>
          <ProfileSummary
            name={'SriHarsha Anugu'}
            title={'Python Developer'}
            summary={
              "Working on improving users' search experience through the usage of refined metrics , worked on crawling through web to get the data, cleaning the data and formatting the data as per the project requirements ."
            }
          />
        </div>
        <div className='glassAboutUs'>
          <div className='img'>
            <img src={require(`./images/kiran.jpg`)} alt={'anon'} />
          </div>
          <ProfileSummary
            name={'Srikiran Velpuri'}
            title={'Full-Stack Developer'}
            summary={
              "I'm a Full Stack developer with hands on experience building web applications , I specialize in JavaScript and have professional experience working with React Js . Along with Front-End technologies I have also worked with Backend technologies like Python, Node Js ."
            }
          />
        </div>
      </div>
    </div>
  )
}

export default AboutUs
