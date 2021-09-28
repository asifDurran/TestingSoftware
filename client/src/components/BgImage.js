import {useState} from "react"
const BgImage = () => {
    const [video] = useState('/videos/bg.mp4')
    return <div className="bgImage">
        <div className="bgImage__video">
        <video src={video} loop autoPlay muted></video>
        </div>
        
    </div>
}
export default BgImage;