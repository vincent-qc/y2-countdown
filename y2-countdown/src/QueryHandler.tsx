import { useEffect } from "react";

interface Props {
  onQueryChange: (query: string | null) => void;
}

const QueryHandler: React.FC<Props> = ({ onQueryChange }) => {
  const params = new URLSearchParams(window.location.search);
  const queryParam = params.get("redirect");

  useEffect(() => {
    onQueryChange(queryParam);
  }, [queryParam, onQueryChange]);

  return null;
};

export default QueryHandler;
