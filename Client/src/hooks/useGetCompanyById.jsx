import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "../store/companySlice"

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    const fetchSingleCompanyData = async () => {
        try {
            const res = await axios.get(`https://opportune-server.onrender.com/company/${companyId}`,{withCredentials: true})
            if(res?.data?.success){
                dispatch(setSingleCompany(res?.data?.company))
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error Fetching Company Info')
        }
    }
    fetchSingleCompanyData();
  },[dispatch, companyId])
  return { errorMessage };
}

export default useGetCompanyById;