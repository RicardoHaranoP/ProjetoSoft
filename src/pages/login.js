
import './login.css'

const login = () => {
    return (
        <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className='w-100 d-flex justify-content-between'>
                        <div class="container2">
                            <h2>Login</h2>
                            <form className='login' action="">
                                <input className='login' type="text" name="username" id="username" placeholder="username" />
                                <input className='login' type="password" name="pass" id="pass" placeholder="password" />
                                <div class="btns">
                                    <button className='login' type="submit">Login</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login