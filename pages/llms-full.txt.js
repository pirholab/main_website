import { buildLlmsFullTxt, sendText } from "../lib/llms";

export const getServerSideProps = ({ res }) => {
  sendText(res, buildLlmsFullTxt());
  return { props: {} };
};

export default function LlmsFullTxt() {
  return null;
}
