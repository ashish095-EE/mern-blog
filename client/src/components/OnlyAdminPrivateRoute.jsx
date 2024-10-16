import { useSelector } from "react-redux"

import { Outlet,Navigate } from "react-router-dom"

export default function OnlyAdminPrivateRoute() {

  const {currentUser} = useSelector((state)=>state.user);

  return currentUser && currentUser.isAdmin ? <Outlet/> : <Navigate to='/signin' />; //if user is admin then navigate to create Post else to sign in page
}
