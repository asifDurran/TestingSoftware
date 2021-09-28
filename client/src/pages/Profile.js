import CoverPhoto from "../components/CoverPhoto"
import Nav from "../components/Nav"
import Sidebar from "../components/Sidebar"


const Profile = () => {
    return (
        <div>
            <Nav />
            <div className="container">
                <div className="row mt-80">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9 pl-15">
                        <CoverPhoto />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
