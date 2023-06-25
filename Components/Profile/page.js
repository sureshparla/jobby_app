'use client'

import { Switch } from "@headlessui/react"
import Cookies from "js-cookie"
import { useEffect,useState } from "react"
import Loader from '@/Components/Loader/page'


const apiStatusConst = {
    success:"SUCCESS",
    failure:"FAILURE",
    initial: "INITIAL",
    progress:"INPROGRESS"
}

const Profile = () => {
    const [profile,setProfile] = useState([])
    const [apiStatus,setApiStatus] = useState(apiStatusConst.initial)

    useEffect(() =>{
        getProfileDetDetails()
    },[])

    const getProfileDetDetails = async () =>{
        setApiStatus(apiStatusConst.progress)
        const ApiUrl = `https://apis.ccbp.in/profile`
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU
        const jwtToken = Cookies.get('jwtToken')
        const options = {
          headers: {

            Authorization: `Bearer ${jwtToken}`,
          },
          method: 'GET',
        }
        const response = await fetch(ApiUrl,options)
        if(response.ok === true){
            const data = await response.json()
            setProfile(data.profile_details)
            setApiStatus(apiStatusConst.success)
            // console.log(data)
        }
        else{
            setApiStatus(apiStatusConst.failure)
        }
    }

        
    function renderSwitchConditions(){
        switch(apiStatus){
            case apiStatusConst.success:
                return renderSuccessView();
            case apiStatusConst.failure:
                return renderFailureView();
            case apiStatusConst.progress:
                return <Loader />
            default:
                return null
        }
    }
    
function renderSuccessView(){
    return(
        <div className='profile-container rounded-3xl p-5 bg-cover'>
            <img src={profile.profile_image_url} alt='profile' 
            className='h-20 w-20 rounded-[50px] mt-2 mb-3' />
            <h1 className='text-blue-400 text-xl font-bold mb-3'>{profile.name}</h1>
            <p className='text-gray-600 text-xl leading-8 '>{profile.short_bio}</p>
        </div>
    )
}


function renderFailureView(){
    return(
        <div className="flex flex-col items-center justify-center mt-11">
            <button type="button" className="bg-[#3f51b5] rounded text-white font-base p-2 pl-3 pr-3">Retry</button>
        </div>
    )
}

  return (
    <>
        {renderSwitchConditions()}
    </>
  )
}

export default Profile