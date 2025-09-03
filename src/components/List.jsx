import React, { useState, useEffect } from 'react';
import AddBtn from './AddInput'


function List() {
    const [task, ChangeTask] = useState('');
    const [TaskAddbtn, changeTaskAddBtn] = useState(true);
    const [Submitbtn, changeSubmit] = useState(false);
    const [ShowInput, ChangeShowInput] = useState(false);
    const [tasks, setTasks] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    async function loadTasks() {
        try {

            const res = await fetch(`${API_URL}/tasks`);
            const data = await res.json()
            console.log("Tasks from backend:", data);
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }
    useEffect(() => {
        loadTasks(); 
    }, []);


    function handleAddClick(e) {
        e.preventDefault()
        changeTaskAddBtn(false);
        changeSubmit(true);
        ChangeShowInput(true);
    }
    async function handleSubmitClick(e) {
        e.preventDefault();
        if (task.trim() !== "") {
            fetch(`${API_URL}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Task saved:", data);
                    ChangeTask("");
                    changeTaskAddBtn(true);
                    changeSubmit(false);
                    ChangeShowInput(false);
                    loadTasks();
                })
                .catch((err) => console.error("Error:", err));
        }
    }

    return (
        <div className="flex flex-col items-center">
            <form className="flex flex-col justify-center items-center">
                <h1 className="text-black md:text-2xl texl-xl mt-20 mb-10 ml-5">
                    “What gets scheduled, gets done.” – Peter Drucker
                </h1>
                <div className='w-full bg-black rounded-4xl pr-8'>

                    <div className="w-full min-h-40 flex flex-col items-center bg-white/90 shadow-2xl p-3 rounded-4xl justify-between md:border-2 m-4">
                        <h1 className="md:text-4xl mb-5 mt-5">Priority Board 📝</h1>
                        <div className='p-10 mb-5 rounded-2xl max-w-150 ' >
                            {tasks.map((t, i) => {
                                return <p key={t.id} className='text-xl md:text-2xl hover:scale-105 m-3 transition-transform duration-200 p-2 rounded-lg shadow-gray-500 hover:shadow-lg ease-in-out'>{i + 1}. {t.task} <button onClick={async (e) => { e.preventDefault(); await fetch(`${API_URL}/tasks/${t.id}`, { method: "DELETE" }); setTasks((prev) => prev.filter((task) => task.id !== t.id)); }} className='float-right hover:cursor-pointer'>✔️</button></p>
                            })}
                        </div>

                        {ShowInput && (
                            <input
                                type="text"
                                onChange={(e) => ChangeTask(e.target.value)}
                                placeholder="Enter your task..."
                                className="p-4  md:w-[400px] rounded-xl mb-10 border-4 bg-amber-50"
                            />
                        )}
                    </div>
                </div>
                {Submitbtn && (
                    <button
                        onClick={handleSubmitClick}
                        className="bg-black text-white p-5 rounded-2xl w-10 w-40 mt-5"
                    >
                        Submit
                    </button>
                )}
            </form>

            {TaskAddbtn && (
                <button
                    onClick={handleAddClick}
                    className="bg-black text-white md:p-5 p-3 rounded-2xl w-40 mt-5"
                >
                    Add Task
                </button>
            )}
        </div>
    );

}

export default List;
