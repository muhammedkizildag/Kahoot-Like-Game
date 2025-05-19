import { useNavigate } from "react-router-dom";
import ExamCard from "../components/ExamCard";
import { useEffect, useRef, useState } from "react";
import AddExam from "../components/addExam";
import { io } from "socket.io-client";
import Question from "../components/question";



const AdminPage = () => {
    const [exams, setExams] = useState([]);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [question, setQuestion] = useState();
    const [gameID, setGameID] = useState();
    const [result, setResult] = useState();
    const socket = useRef();
    const username = useRef('');


    const navigate = useNavigate();

    useEffect(() => {
        console.log(`${import.meta.env.VITE_API_URL}/session-check`)
        fetch(`${import.meta.env.VITE_API_URL}/session-check`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (!data.isLoggedIn) navigate('/login')
                else username.current = data.username
            })


        socket.current = io(`${import.meta.env.VITE_API_URL}`);
        socket.current.on('game', data => setQuestion(data.question));
        socket.current.on('finish', (data, res) => {
            setIsFinished(true);
            setResult(data.result);
            console.log(data);
        })

    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/get-exams`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setExams(data);
            })
    }, [isMenuOpened])



    const logOut = () => {
        fetch(`${import.meta.env.VITE_API_URL}/logout`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.isLoggedOut) navigate('/login');
            })
    }

    const handleStartButton = () => {
        socket.current.emit('start_game', { username: username.current, id: gameID }, res => {
            setIsStarted(true);
            console.log(res);
        });
    }

    if (isFinished) return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex flex-col p-10 bg-[rgba(0,0,0,0.25)] rounded-xl max-w-md w-full shadow-2xl">
                {result.map(e => {
                    return (
                        <div>
                            <span className="text-white text-xl font-bold">{e.nickname}:</span>
                            <span className="text-white text-xl font-bold"> {e.point} puan</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )



    if (!isPlaying) return (
        <div>
            <button onClick={logOut} className="absolute right-1 top-1 p-3 bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300">Çıkış Yap</button>
            <h1 className="p-8 text-4xl font-semibold">Sınavlar</h1>
            <div style={{ backgroundColor: 'black', width: "calc(100% - 64px)", height: 1.5 }} className="ml-8 mr-8"></div>

            <div className="p-8 grid grid-cols-6 gap-x-8 gap-y-8">
                {exams.map(exam => <ExamCard name={exam.name} questionNumber={exam.questions.length} socket={socket} setPlaying={setIsPlaying} username={username.current} questions={exam.questions} setGameID={setGameID} />)}
                <button onClick={e => setIsMenuOpened(true)} className=" p-3 bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300">Sınav ekle</button>
            </div>
            <AddExam isOpened={isMenuOpened} setOpened={setIsMenuOpened} />
        </div>
    )

    else return (
        <div className="flex justify-center items-center h-screen w-screen">
            {isStarted
                ? <Question question={question} />
                :
                <div> <p className="p-3 text-white rounded-xl leading-[18.4px] text-base font-bold">{gameID}</p> <button onClick={handleStartButton} className=" p-3 bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300">Başlat</button></div>}
        </div>
    )
}

export default AdminPage;