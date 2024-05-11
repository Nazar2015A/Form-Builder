import { authConsts } from "../../consts/server-consts";
import { Button } from "../../components/ui/button";
import GoogleIcon from "../../assets/GoogleIcon";

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = authConsts.googleAuth;
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[400px] max-w-[400px] h-[200px] max-h-[200px] bg-primary p-8 rounded-md">
        <h2 className="text-background text-2xl font-semibold">Sign in</h2>
        <h3 className="text-muted-foreground text-lg mb-6">to continue to Form Builder</h3>
        <Button className="w-full border border-gray-300 justify-start gap-4 hover:bg-background/5 font-[400] text-muted/80 px-4 py-6" onClick={handleLogin}><GoogleIcon /> Continue with Google</Button>
      </div>
    </div>
  );
};

export default LoginPage;
