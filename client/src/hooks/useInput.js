import {useState} from "react"
const useInput = (data) => {
   const [state, setState] = useState(data);
   const handleInputs = e => {
       setState({...state, [e.target.name] : e.target.value})
   }
   return [state, handleInputs]
}
export default useInput;