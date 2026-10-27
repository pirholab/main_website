import { buildLlmsTxt, sendText } from "../lib/llms";

export const getServerSideProps = ({ res }) => {
  sendText(res, buildLlmsTxt());
  return { props: {} };
};

export default function LlmsTxt() {
  return null;
}
