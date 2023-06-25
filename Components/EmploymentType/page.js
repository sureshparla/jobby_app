import React from 'react'

const EmploymentType = props => {
    const {employmentTypesList,onToggleCheckEmployment} = props
    const {label,employmentTypeId} = employmentTypesList

    const onToggleCheck = () =>{
        onToggleCheckEmployment(employmentTypeId)
    }
  return (
        <li className='flex items-center mt-3 mb-3'>
            <input type='checkbox' id={employmentTypeId} className='h-4 w-4 mr-2'
            onChange={onToggleCheck}
            value={employmentTypeId} />
            <label className='text-white text-lg font-base' htmlFor={employmentTypeId}>{label}</label>
        </li>
  )
}

export default EmploymentType