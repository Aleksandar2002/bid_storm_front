/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import z from "zod";
import TextField from "../../shared/components/form/TextField";
import { useLoader } from "../../shared/hooks/useLoader";
import { getUserData, login } from "../../app/services/authService";
import { useToast } from "../../app/stores/toastMessageStore";

const schema = z.object({
  email: z.email({
    message: "Invalid email format",
  }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_\-+=<>?.]{8,40}$/,
      "Invalid password format",
    ),
});

type Type = z.infer<typeof schema>;

// type TLoginForm = {
//   email: string;
//   password: string;
// };

function LoginNonGeneric() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Type>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "aca023494@gmail.com",
      password: "Sifra123.",
    },
  });

  const { setLoading } = useLoader();
  const { setSuccessToast, setErrorToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data: Type) => {
    setLoading(true);
    try {
      const resp = await login(data.email, data.password);
      if (resp?.status == 204) {
        await handleSuccessfulLogin();
      }
    } catch (err: any) {
      if (err.response.status == 401) setErrorToast(err.response.data.message);
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessfulLogin = async () => {
    const meResponse = await getUserData();
    console.log(meResponse);
    return;
    setSuccessToast("Login is successful");
    navigate("/");
  };

  return (
    <div className="form-center-div">
      <form className="bs-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Login form</h3>
        {/* <div className="form-field">
          <label htmlFor="email">Email: </label>
          <input {...register("email")} type="text" name="email" id="email" />
          {errors.email && <span>{errors.email.message}</span>}
        </div> */}
        <TextField<Type>
          type="text"
          label="Email:"
          name="email"
          register={register}
          errors={errors}
        />
        <TextField<Type>
          type="password"
          label="Password"
          name="password"
          register={register}
          errors={errors}
        />

        <input className="submit-btn" type="submit" />
        <p className="text-center m-4">
          Don't have an account? Register <Link to="/register">HERE</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginNonGeneric;
