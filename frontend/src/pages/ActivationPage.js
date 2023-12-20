import React, { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server";

const ActivationPage = () => {
  const { token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const activationEmail = async () => {
      try {
        const res = await axios.post(`${server}/user/activation`, {
          activation_token: token,
        });
        console.log(res);
      } catch (error) {
        setError(true);
      }
    };
    activationEmail();
  }, []);
  return (
    <div className="flex justify-center items-center">
      {error ? (
        <> Your token is expired</>
      ) : (
        <>Your Account is successfully created !!</>
      )}
    </div>
  );
};

export default ActivationPage;
