import LoginCard from "../components/LoginCard";
import Logo from "../components/Logo";

function LoginPage() {
  return (
    <div className="min-h-screen bg-orange-100 flex flex-col items-center justify-center">
      <Logo fontSize={42}/>
      <LoginCard />
    </div>
  );
}
export default LoginPage;
