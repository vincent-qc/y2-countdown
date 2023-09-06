import { useEffect, useState } from "react";
import "./App.css";
import QueryHandler from "./QueryHandler";

const DEATH = new Date("2024-04-05T12:00:00");

const App: React.FC = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [query, setQuery] = useState<string | null>(null);

  const updateTime = () => {
    const now = new Date();
    const timeDifference = DEATH.getTime() - now.getTime();

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    } else {
      setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="App">
      <QueryHandler onQueryChange={setQuery} />
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        {time.days} Days, {time.hours} Hours, {time.minutes} Minutes, and{" "}
        {time.seconds} Seconds remaining until May Exams.
      </div>
      {query && (
        <div
          style={{
            color: "#909090",
          }}
        >
          Do not proceed to <i>{query}</i>
        </div>
      )}
    </div>
  );
};

export default App;
