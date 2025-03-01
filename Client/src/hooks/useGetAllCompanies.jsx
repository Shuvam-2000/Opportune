import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAllCompany } from "../store/companySlice";

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        const getAllCompaniesData = async () => {
            try {
                const res = await axios.get(`https://opportune-server.onrender.com/company/mycompanies`,{withCredentials: true})
                if(res?.data?.success){
                    dispatch(setAllCompany(res?.data?.company))
                }
            } catch (error) {
                setErrorMessage(error.response?.data?.message || "Error Fetching Companies")
            }
        }
        getAllCompaniesData()
    },[])
    return { errorMessage }
};

export default useGetAllCompanies;
