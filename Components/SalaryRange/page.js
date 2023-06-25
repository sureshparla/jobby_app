import React from 'react'

const SalaryRange = props => {
    const {salaryRangesList,onToggleSalary} = props
    const {label,salaryRangeId} = salaryRangesList

    const onToggleSalaryBtn = () =>{
      onToggleSalary(salaryRangeId)
    }
  return (
    <li className='flex items-center mt-3 mb-3'>
        <input type='checkbox' id={salaryRangeId} className='h-4 w-4 mr-2' onChange={onToggleSalaryBtn} value={salaryRangeId}  />
        <label className='text-white text-lg font-base' htmlFor={salaryRangeId}>{label}</label>
  </li>
  )
}

export default SalaryRange