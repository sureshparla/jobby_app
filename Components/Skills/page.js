import React, { useState } from 'react'

const Skills = props => {
    const {skillsList} = props
    const {imageUrl,name} = skillsList

  return (
    <div className='flex items-center ml-3 mr-3 mt-4 mb-10 '>
        <img src={imageUrl} alt={name} className='w-12' />
        <h1 className='text-gray-300 text-xl font-medium ml-2'>{name}</h1>
    </div>
  )
}

export default Skills