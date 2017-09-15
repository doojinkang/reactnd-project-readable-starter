import React from 'react'
import Toast from '../components/Toast'

const About = () => {
  return (
    <div className='container'>
      README.md
      <br/>
      <Toast
        onRef={ref => (this.toast = ref)}
      />
      <button class='btn, btn-default' onClick={() => this.toast.show('Message', 'Hello world')}>Open</button>
      <button class='btn, btn-default'>Close</button>
    </div>
  )
}

export default About