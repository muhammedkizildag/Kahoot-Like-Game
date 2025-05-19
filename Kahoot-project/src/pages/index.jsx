import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";





const HomePage = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [gameID, setGameID] = useState('');
    const [nickname, setNickname] = useState('');
    const [question, setQuestion] = useState();
    const [result, setResult] = useState();
    const socket = useRef(null);

    useEffect(() => {
        socket.current = io(`${import.meta.env.VITE_API_URL}`);
        socket.current.on('game', (data, res) => {
            setIsWaiting(false);
            setQuestion(data.question);
        })
        socket.current.on('finish', (data, res) => {
            setIsFinished(true);
            setResult(data.result);
            console.log(data);
        });

    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();

        socket.current.emit('join_game', { id: gameID, nickname: nickname }, res => {
            if (res.isJoined) {
                setIsWaiting(true);
                setIsPlaying(true);
            }


        });

    }

    const handleAnswer = (answer) => {
        socket.current.emit('answer', { id: gameID, answer: answer, nickname: nickname }, res => {
            if (res.status) {
                setIsWaiting(true);
            }
        });
    }

    if (isFinished) {
        return (
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
    }


    if (isWaiting) {
        return (
            <div className="flex justify-center items-center h-screen w-screen">
                <p className="text-3xl text-white font-bold text-center mb-8">Bekleniyor..</p>
            </div>
        )
    }





    if (isPlaying) {
        return (
            <div className="flex justify-center items-center h-screen w-screen">
                <div className="relative rounded-md md:w-xl w-full h-100 p-4 shadow-2xl">
                    <p className="text-2xl text-white">{question.number}</p>
                    <p className="text-2xl text-white">{question.question}</p>
                    <div className="absolute left-0 p-3 bottom-4 grid md:grid-cols-2 grid-cols-1 gap-x-1 gap-y-1 w-full">
                        <button onClick={() => handleAnswer(1)} className="w-full p-3  bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300">{question.answers[0]}</button>
                        <button onClick={() => handleAnswer(2)} className="w-full p-3  bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300">{question.answers[1]}</button>
                        <button onClick={() => handleAnswer(3)} className="w-full p-3  bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300">{question.answers[2]}</button>
                        <button onClick={() => handleAnswer(4)} className="w-full p-3  bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300">{question.answers[3]}</button>
                    </div>
                </div>
            </div>
        )
    }

    else return (
        <div className="flex justify-center items-center h-screen w-screen">
            <form onSubmit={handleSubmit} className="flex flex-col p-10 bg-[rgba(0,0,0,0.25)] rounded-xl max-w-md w-full shadow-2xl">
                <h2 className="text-3xl text-white font-bold text-center mb-8">Oyuna Katıl</h2>
                <label htmlFor="Odakodu" className="text-white text-lg font-bold">Oda Kodu</label>
                <input onChange={(e) => setGameID(e.target.value)} type="text" name="Odakodu" className="p-2.5 text-base leading-none w-full mb-4 bg-white rounded-lg" required />
                <label htmlFor="Takmaad" className="text-white text-lg font-bold">Takma Ad</label>
                <input onChange={(e) => setNickname(e.target.value)} type="text" name="Takmaad" className="p-2.5 text-base leading-none w-full mb-4 bg-white rounded-lg" required />
                <button type="submit" className="w-full p-3 bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300" >Katıl</button>
            </form>

        </div>
    )
}


export default HomePage;