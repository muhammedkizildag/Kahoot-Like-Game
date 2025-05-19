import { useState } from "react";





const AddExam = (props) => {

    const [inputs, setInputs] = useState([{
        number: 1,
        question: '',
        answers: ['', '', '', ''],
        correctAnswer: 1
    }]);
    const [examName, setExamName] = useState('');


    const handleChange = (i, field, value, answerIndex = null) => {
        setInputs(prev => {
            const newInputs = [...prev];
            if (field === 'question') {
                newInputs[i].question = value;
            } else if (field === 'answer') {
                newInputs[i].answers[answerIndex] = value;
            } else if (field === 'correctAnswer') {
                newInputs[i].correctAnswer = value;
            }
            return newInputs;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            name: examName,
            questions: inputs
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/add-exam`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: 'include'
        })

        if (res.status == 200) {
            setInputs([{
                number: 1,
                question: '',
                answers: ['', '', '', ''],
                correctAnswer: 1
            }]);
            props.setOpened(false);
        }


    }




    const handleMapping = (e, i) => {

        console.log(e)

        return (
            <div>
                <div>
                    <label htmlFor="" className="text-white text-lg font-bold">Soru {e.number}</label>
                    <input value={e.question} type="text" className="p-1.5 text-base leading-none w-full bg-white rounded-lg" onChange={(e) => handleChange(i, 'question', e.target.value)} required />

                </div>
                <div>
                    <label htmlFor="" className="text-white text-lg font-bold">A</label>
                    <input required value={e.answers[0]} type="text" className="p-1.5 text-base leading-none w-full bg-white rounded-lg" onChange={(ev) => handleChange(i, 'answer', ev.target.value, 0)} />
                    <input checked={e.correctAnswer == 1} type="checkbox" name="" id="" onChange={() => handleChange(i, 'correctAnswer', 1)} />
                </div>
                <div>
                    <label htmlFor="" className="text-white text-lg font-bold">B</label>
                    <input required value={e.answers[1]} type="text" className="p-1.5 text-base leading-none w-full bg-white rounded-lg" onChange={(ev) => handleChange(i, 'answer', ev.target.value, 1)} />
                    <input checked={e.correctAnswer == 2} type="checkbox" name="" id="" onChange={() => handleChange(i, 'correctAnswer', 2)} />
                </div>
                <div>
                    <label htmlFor="" className="text-white text-lg font-bold">C</label>
                    <input required value={e.answers[2]} type="text" className="p-1.5 text-base leading-none w-full bg-white rounded-lg" onChange={(ev) => handleChange(i, 'answer', ev.target.value, 2)} />
                    <input checked={e.correctAnswer == 3} type="checkbox" name="" id="" onChange={() => handleChange(i, 'correctAnswer', 3)} />
                </div>
                <div>
                    <label htmlFor="" className="text-white text-lg font-bold">D</label>
                    <input required value={e.answers[3]} type="text" className="p-1.5 text-base leading-none w-full bg-white rounded-lg" onChange={(ev) => handleChange(i, 'answer', ev.target.value, 3)} />
                    <input checked={e.correctAnswer == 4} type="checkbox" name="" id="" onChange={() => handleChange(i, 'correctAnswer', 4)} />
                </div>
            </div>
        )

    }



    console.log(props.isOpened)
    return (
        <div style={{ display: props.isOpened ? 'flex' : 'none' }} className="fixed left-0 top-0 w-screen h-screen justify-center items-center">
            <div onClick={e => props.setOpened(false)} className="fixed left-0 top-0 w-screen h-screen bg-black opacity-40 z-999" />
            <div className="w-4/5 p-12 bg-[#00d1b2] rounded-2xl max-w-xl max-h-4/5 z-1000 overflow-auto">
                <form onSubmit={handleSubmit} action="">
                    <label htmlFor="" className="text-white text-lg font-bold">Sınav adı</label>
                    <input required value={examName} type="text" className="p-1.5 text-base leading-none w-full bg-white rounded-lg" onChange={e => setExamName(e.target.value)} />
                    {inputs.map(handleMapping)}
                    <button onClick={() => setInputs(prev => [...prev, { number: inputs.length + 1, question: '', answers: ['', '', '', ''], correctAnswer: 1 }])} className="p-2 bg-indigo-400 rounded-md cursor-pointer text-white font-bold">Yeni Soru</button>
                    <button type="submit" className="p-2 ml-2 bg-indigo-400 rounded-md cursor-pointer text-white font-bold">Oluştur</button>
                </form>

            </div>
        </div>
    )
}




export default AddExam;