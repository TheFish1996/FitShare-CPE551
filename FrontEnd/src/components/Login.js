import React, {useState} from "react";

function Login() {

    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            <p>You clicked {count} times</p>
        </div>
    );
}

export default Login;