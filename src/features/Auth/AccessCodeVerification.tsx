import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { verifyAccessCode } from "../../app/services/authService";
import { handleSuccessfulLogin } from "../../shared/utils/authHelper";
import { useToast } from "../../shared/hooks/useToast";
import { useNavigate } from "react-router";

/* eslint-disable @typescript-eslint/no-explicit-any */
const AccessCodeVerification = () => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [error, setError] = useState<string>("");

  const { setSuccessToast, setErrorToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const codeStr = code.join("");

    if (!/^[0-9A-z]{6}$/.test(codeStr)) {
      setError("Must contains 6 number digits");
    }
    console.log(codeStr);

    try {
      const resp = await verifyAccessCode(codeStr);
      console.log(resp);
      if (resp && resp.status == 204) {
        handleSuccessfulLogin(setSuccessToast, navigate);
      }
    } catch (err: any) {
      console.log(err.response);

      if (err?.response && err.response.status == 401) {
        setErrorToast(err.response.data?.message ?? "Unauthorized error");
      } else {
        setErrorToast("Some error happened during verification");
      }
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.currentTarget.value;

    if (/[^A-z0-9]/.test(val)) {
      return;
    }

    const newCode = [...code];

    newCode[index] = val.substring(val.length - 1);
    setCode(newCode);

    if (val && e.currentTarget.nextElementSibling) {
      (e.currentTarget.nextElementSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (
      e.key == "Backspace" &&
      !code[index] &&
      e.currentTarget.previousElementSibling
    ) {
      (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
    }
  };

  return (
    <div className="bs-form-div code-verification-div">
      <h2>{"Access code verification"}</h2>
      <p>Your access code has been sent to your email</p>
      <form className="bs-form" onSubmit={handleSubmit}>
        <div className="input-div">
          {code.map((el, index) => {
            return (
              <input
                key={index}
                type="text"
                className="code-input"
                pattern="[0-9A-z]*"
                maxLength={1}
                value={el}
                name="first"
                onChange={(e: any) => handleInputChange(e, index)}
                onKeyDown={(e: any) => handleKeyDown(e, index)}
              />
            );
          })}
        </div>
        {error && <div className="error-message">{error}</div>}
        <label>Enter your access code here</label>
        <input className="submit-btn" type="submit" />
      </form>
    </div>
  );
};

export default AccessCodeVerification;
