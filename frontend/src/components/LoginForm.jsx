import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useLoginUserMutation } from "../app/features/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../app/features/userSlice";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data).unwrap();
      dispatch(setUser(user?.data?.user));
      toast.success("Login successfull");
      navigate("/");
    } catch (err) {
      if (err?.data?.message) {
        // Backend error message
        toast.error(err.data.message);
      } else if (err.status === "PARSING_ERROR") {
        // Handle invalid JSON response
        toast.error("Server returned an invalid response");
      } else {
        // Generic error
        toast.error("An unexpected error occurred");
      }
      console.error("Error details: ", err);
      navigate("/login");
    }
  };

  return (
    <Card className="mx-auto min-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div>
              <Input
                id="email"
                type="email"
                disabled={isLoading}
                placeholder="m@example.com"
                {...register("email", { required: true })}
              />

              {errors.email && (
                <p className="text-red-400 text-sm pl-4 pt-1">
                  Name is required.
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <div>
              <div className="flex relative ">
                <Input
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  className="w-full"
                  disabled={isLoading}
                  {...register("password", { required: true })}
                />

                <span
                  className="absolute right-3 top-3 cursor-pointer hover:text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm pl-4 pt-1">
                  Password is required
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            Login
          </Button>
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
