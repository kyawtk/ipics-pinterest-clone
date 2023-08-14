import { GoogleLogin } from "@react-oauth/google";
import ipicsVid from "../assets/share.mp4";
import logowhite from "../assets/logowhite.png";
import jwtDecode from "jwt-decode";
import client from "../client";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate  = useNavigate()
  const responseMessage = (response) => {
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
    let doc = {
      _id: userObject.sub,
      _type: "user",
      userName: userObject.name,
      image: userObject.picture,
    };
    client.createIfNotExists(doc).then((res) => {
      console.log("New user Created");
      console.log(res);
      navigate("/", {replace:true})
    });
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col">
      <div className="relative w-full h-full">
        <video
          src={ipicsVid}
          type="video/mp4"
          muted
          loop
          autoPlay
          className="w-full h-full object-cover"
        ></video>
      </div>
      <div className="absolute inset-0 bg-blackOverlay flex flex-col gap-10 items-center justify-center">
        <img src={logowhite} alt="logo" className="w-[200px]" />
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
    </section>
  );
};

export default Login;
