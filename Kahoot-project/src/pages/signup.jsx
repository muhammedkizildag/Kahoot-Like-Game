import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";





const SignupPage = () => {
    const [inputs, setInputs] = useState({});
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://localhost:3001/session-check', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.isLoggedIn) navigate('/admin')
            })

    }, [isLogged]);




    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs),
            credentials: 'include'
        })
        if (res.status == 200) setIsLogged(true);

    }

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <Link to='/login' className="absolute right-1 top-1 p-3 bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300">Giriş Yap</Link>
            <form onSubmit={handleSubmit} className="flex flex-col p-10 bg-[rgba(0,0,0,0.25)] rounded-xl max-w-md w-full shadow-2xl"  >
                <label htmlFor="username" className="text-white text-lg font-bold">Username</label>
                <input required name="username" type="text" className="p-2.5 text-base leading-none w-full mb-4 bg-white rounded-lg" onChange={handleChange} />
                <label htmlFor="password" className="text-white text-lg font-bold">Password</label>
                <input required type="password" name="password" className="p-2.5 text-base leading-none w-full bg-white rounded-lg mb-4" onChange={handleChange} />
                <button type="submit" className="w-full p-3 bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300" >Kayıt Ol</button>
            </form>
        </div>
    )
}


export default SignupPage;