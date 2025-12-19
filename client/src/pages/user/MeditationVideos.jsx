import React from 'react'
import { useNavigate } from 'react-router-dom'
import { meditationVideos } from '../../data/meditationVideos'
import SavedVideos from '../../components/SavedVideos'
import UserSidebar from '../../components/layout/UserSidebar'

const MeditationVideos = () => {
  const navigate = useNavigate()
  return (
    <div className='pt-4 m-2'>
        <UserSidebar />
        <SavedVideos videos={meditationVideos} onBack={() => navigate('/dashboard')} />
    </div>
  )
}

export default MeditationVideos