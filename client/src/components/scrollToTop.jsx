import { useEffect } from "react"
import { useLocation } from "react-router-dom"
const ScrollToTop = () => {
    const{pathname} = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        // if path is not /home, then scroll to top after every route change
        
    },[pathname]);
  return null;
    
  
}

export default ScrollToTop
