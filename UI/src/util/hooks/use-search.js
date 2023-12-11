import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const useSearch = (action) => {
    const navigate = useNavigate();

    const [search, setSearch] = useState({
        status: false,
        value: ""
    });
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);


    useEffect(() => {
        if (search.status) {
            setLoader(true);
            action(search.value).then(
                (result) => {
                    if (result === 401) {
                        navigate('/auth/signin?mode=login');
                    } else if (!result) {
                        setData("try again");
                    } else {
                        setData(result);
                    }
                }
            ).then(() => {
                setLoader(false);
            });
        }
    }, [search])

    const onSearchInputChangeHandler = (event) => {
        if (event.target.value.trim() === "") {
            setSearch({
                status: false,
                value: ""
            })
        } else {
            setSearch({
                status: true,
                value: event.target.value
            })
        }
    }

    return {
        onSearchInputChangeHandler,
        loader,
        data,
        search
    }
}

export default useSearch;