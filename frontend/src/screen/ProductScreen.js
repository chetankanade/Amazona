import { useParams } from "react-router";

export default function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
