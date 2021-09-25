import { CircularProgress } from "@material-ui/core";

export default function LoadingScreen() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "80vh" }}
    >
      <CircularProgress color="primary" />
    </div>
  );
}
