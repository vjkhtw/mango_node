"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export const validationSchema = z.object({
  username: z.string().min(3, { message: "Username is required" }),
  email: z.string().min(10, { message: "Email is required" }),
  password: z
    .string()
    .min(5, { message: "Password must be atleast 5 characters" }),
});
export type RegisterValidationSchema = z.infer<typeof validationSchema>;

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValidationSchema>({
    resolver: zodResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<RegisterValidationSchema> = (data) => {
    axios
      .post("http://localhost:8081/api/register", data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        router.push("/login");
        toast.success("Registered SUCCESSFULLY!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <PageTransition>
        <Toaster richColors />
        <div className=" inset-0 z-50 overflow-auto bg-slate-200 flex justify-center items-center">
          <div className="m-36 bg-white rounded-sm px-16 max-w-md mx-auto shadow-lg">
            <h1 className="pt-10 text-2xl">Sign Up to your account</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mb-4 flex gap-3 flex-col items-center mt-10"
            >
              <input
                {...register("username", { required: true })}
                className="p-2 mb-4 border-b-2 border-black  outline-none focus:border-b-2 focus:border-orange-600"
                type="text"
                placeholder="Enter your Username"
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
              <input
                {...register("email", { required: true })}
                className="p-2 mb-4 border-b-2 border-black  outline-none focus:border-b-2 focus:border-orange-600"
                type="text"
                placeholder="Enter your Email Address"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
              <input
                {...register("password", { required: true })}
                className="p-2 mb-4 border-b-2 border-black outline-none focus:border-b-2 focus:border-blue-900"
                type="password"
                placeholder="Enter your Password"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              <button className="w-full mt-4 border  p-2 bg-orange-600 text-white rounded-md uppercase">
                Submit
              </button>

              <div className="mt-4 border-b border-black"></div>

              <div className="text-lg space-x-5 flex mt-2">
                <div>Have an Account?</div>
                <Link href="/login" className="text-blue1">
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Register;
