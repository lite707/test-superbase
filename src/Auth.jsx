import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  const handleZHu = async () => {
    const randomNumber = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    console.log(randomNumber);
    let { data, error } = await supabase.auth.signUp({
      email: `someone${randomNumber}@email.com`,
      password: "nBlCgiaDcMeeHjYgJHRD", //$2a$10$k1Durl2i7tbdoS22jvbBIeNhKkO60iSBMLsjn0c90kFGcEmDiIhTS
    });
    console.log({ data });
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleLogIn = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: inputValue,
      password: "nBlCgiaDcMeeHjYgJHRD",
    });
    console.log({ data });
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button className={"button block"} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Send magic link</span>}
            </button>
          </div>

          <div>
            <button className={"button block"} onClick={handleZHu}>
              注册一个随机账号
            </button>
          </div>

          <div>
            <input
              className="inputField"
              type="email"
              value={inputValue}
              onChange={handleChange}
              placeholder="Your email"
            />
            <input
              className="inputField"
              placeholder="Your password , 这是假的 ，写了也没用"
            />
            <button className={"button block"} onClick={handleLogIn}>
              密码方式登录账号
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
