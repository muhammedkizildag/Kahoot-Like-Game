


const ExamCard = (props) => {

    const handleClick = (e) => {
        
        props.socket.current.emit('create_game', {username: props.username, questions: props.questions}, res => {
            console.log(res);
            props.setGameID(res.id);
        });
        props.setPlaying(true);

    }

    return (
        <div className="relative bg-indigo-500 rounded-xl shadow-xl h-50 pl-2 pt-2">
            <p className="text-lg text-white">{props.name}</p>
            <p className="text-xs text-gray-300">{props.questionNumber}</p>
            <button onClick={handleClick} className="absolute bottom-2 p-3 bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300">Başlat</button>

        </div>
    )


}

export default ExamCard;