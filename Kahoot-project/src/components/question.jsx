




const Question = (props) => {




    return (
        <div className="relative rounded-md w-xl h-100 p-4 shadow-2xl">
            <p className="text-2xl text-white">{props.question.number}</p>
            <p className="text-2xl text-white">{props.question.question}</p>
            <div className="absolute bottom-4 grid grid-cols-2 gap-x-1 gap-y-1 w-136">
                <button className="w-full p-3  bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300">{props.question.answers[0]}</button>
                <button className="w-full p-3  bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300">{props.question.answers[1]}</button>
                <button className="w-full p-3  bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300">{props.question.answers[2]}</button>
                <button className="w-full p-3  bg-[#00d1b2] hover:bg-[#00b89c] text-white rounded-xl leading-[18.4px] text-base font-bold cursor-pointer transition-colors duration-300">{props.question.answers[3]}</button>
            </div>

        </div>
    )
}

export default Question;