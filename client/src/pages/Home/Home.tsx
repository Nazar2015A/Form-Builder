import FormCards from "../../components/FormCard/FormCards";
import CreateFormBtn from "../../components/CreateFormBtn";
import { Separator } from "../../components/ui/separator";
import { useHealthCheck } from "@webscopeio/react-health-check";

const Home = () => {
  const { available} = useHealthCheck("auth")
  console.log(available)
  return (
    <div className="container pt-4">
      <h2 className="text-center text-4xl font-bold pb-4">Your Forms</h2>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <CreateFormBtn />
        <FormCards />
      </div>
    </div>
  );
};

export default Home;
