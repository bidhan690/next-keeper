import Main from "@/components/HomePage/Main";
import { getData } from "@/helpers/mongoDb";

export default function App(props) {
  return <Main data={props.data} />;
}

export async function getServerSideProps() {
  const data = await getData();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
}
