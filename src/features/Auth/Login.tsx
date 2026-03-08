/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router";
import GenericForm from "../../shared/components/generics/GenericForm";
import { fields, schema, type FormType } from "./formData/loginData";
import { useLoader } from "../../shared/hooks/useLoader";
import { login } from "../../app/services/authService";
import { useToast } from "../../shared/hooks/useToast";
import { handleSuccessfulLogin } from "../../shared/utils/authHelper";

const Login = () => {
  const { setLoading } = useLoader();
  const { setSuccessToast, setErrorToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (data: FormType) => {
    setLoading(true);
    try {
      const resp = await login(data.email, data.password);
      console.log(resp);

      if (resp?.status == 204) {
        await handleSuccessfulLogin(setSuccessToast, navigate);
      }
    } catch (err: any) {
      if (err?.response?.status == 401) {
        setErrorToast(err.response.data.message);
      } else {
        setErrorToast("Some error during login");
      }
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  const defaultValues: Partial<FormType> = {
    email: "aca023494@gmail.com",
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
