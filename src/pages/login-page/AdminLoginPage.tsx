import LoginForm from "./components/LoginForm";

export default function AdminLoginPage() {
  // const token=localStorage.getItem("access");
  return (
    <>
    <div className="flex flex-col justify-center items-center w-full pt-10 gap-2">
      <LoginForm rol={"مدیریت"}/>
    </div>
    </>
  )
}
