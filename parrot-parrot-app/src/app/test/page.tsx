import DashboardHeader from '@/components/DashboardHeader';
import { getUserDetails } from '@/services/userService'
import React from 'react'

async function TestPage() {
    const user = await getUserDetails();
  return (
    <div>
      TestPage
      {JSON.stringify(user, null, 2)}
      {/* You can add more components or content here */}
    </div>
  )
}

export default TestPage
