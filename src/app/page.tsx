import App from "@/components/App";

const Page = async () => {
  await new Promise(r => setTimeout(r, 500));
  return <App />;
};

export default Page;
