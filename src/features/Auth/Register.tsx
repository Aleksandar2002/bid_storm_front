/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router";
import GenericForm from "../../shared/components/generics/GenericForm";
import {
  registerFormFields,
  registerSchema,
  type RegistrationFormType,
} from "./formData/registerData";
import { register } from "../../app/services/authService";
import type { ValidationErrorType } from "../../types/ValidationType";
import { useState } from "react";
import { useToast } from "../../app/stores/toastMessageStore";

function Register() {
  const { setErrorToast, setSuccessToast } = useToast();
  const [serverErrors, setServerErrors] = useState<string[]>();
  const navigate = useNavigate();
  const handleFormSubmit = async (data: RegistrationFormType) => {
    try {
      const resp = await register(data);
      console.log(resp);

      if (resp?.status == 204) {
        await handleSuccessfulRegister();
      }
    } catch (err: any) {
      console.log(err);

      setErrorToast("Some error while registering");
      if (err?.response?.status == 422) {
        setServerErrors(
          err.response.data.map((errObj: ValidationErrorType) => errObj.error),
        );
      }
      console.log(err?.response);
    }
  };

  const handleSuccessfulRegister = async () => {
    setSuccessToast("Registration is successful");
    navigate("/codeVerification");
  };

  const defaultValues = {
    email: "aca023494@gmail.com",
    password: "Sifra123#",
    username: "MyLoveIsZeinab123",
    confirmPassword: "Sifra123#",
    firstName: "Zeinab",
    lastName: "Kovac",
    dateOfBirth: "2005-04-30",
    gender: 2 as 1 | 2,
    street: "JNA",
    streetNumber: "13",
    apartmentNumber: 10,
    phoneNumber: "+381637156236",
    placeId: 88,
  };

  return (
    <div>
      <div className="font-bold">
        <GenericForm
          title="Registration form"
          fields={registerFormFields}
          validation={registerSchema}
          onSubmitAction={handleFormSubmit}
          defaultValues={defaultValues}
        >
          <p className="text-center m-4 additional-form-text">
            Already have an account? Login <Link to="/login">HERE</Link>
          </p>
          {serverErrors && (
            <div className="error-message">
              {serverErrors.map((err) => (
                <div>{err}</div>
              ))}
            </div>
          )}
        </GenericForm>
      </div>
    </div>
  );
}

export default Register;
