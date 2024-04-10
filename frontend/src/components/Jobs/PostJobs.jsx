import React, { useState } from 'react'


const PostJobs = () => {

    //useStates 
    const [title, setTitle] = useState();
    const [discription, setDiscription] = useState();
    const [category, setCategory] = useState();

    //handle submit 
    const handleSubmit = () => {
        console.log("hendle submiit is working iin the browser")
    }
    return (
        <>
            <div className="postjob-container">
                <h1>POST JOB</h1>
                <div className="postjob-content">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Title :
                            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        <label>
                            Discription :
                            <input type="text" name="discription" value={discription} onChange={(e) => setDiscription(e.target.value)} />
                        </label>
                        <label>
                            Category :
                            <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                        </label>
                        <button>CREATE JOB</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PostJobs