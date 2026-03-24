/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router";
import GenericForm from "../../shared/components/generics/GenericForm";
import { fields, schema, type FormType } from "./formData/loginData";
import { login } from "../../app/services/authService";
import { handleSuccessfulLogin } from "../../shared/utils/authHelper";
import { useToast } from "../../app/stores/toastMessageStore";

const Login = () => {
  const { setSuccessToast, setErrorToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (data: FormType) => {
    try {
      const resp = await login(data.email, data.password);

      if (resp?.status == 204) {
        await handleSuccessfulLogin(setSuccessToast, navigate);
      }
    } catch (err: any) {
      if (err?.response?.status == 401 || err?.response?.status == 404) {
        setErrorToast(err.response.data.message);
      } else {
        setErrorToast("Some error during login");
      }
      console.log(err.response);
    }
  };

  const defaultValues: Partial<FormType> = {
    // email: "aca023494@gmail.com",
    // email: "kovacevicaleksandar2002@gmail.com",
    email: "alex1510sh1@gmail.com",
    password: "Sifra123#",
  };

  return (
    <div>
      <GenericForm
        fields={fields}
        validation={schema}
        title="Login form"
        onSubmitAction={handleSubmit}
        defaultValues={defaultValues}
      >
        <p className="text-center m-4 additional-form-text">
          Don't have an account? Register <Link to="/register">HERE</Link>
        </p>
      </GenericForm>
    </div>
  );
};

export default Login;
