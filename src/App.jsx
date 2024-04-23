import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://xggqgyareguxvuehlhst.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnZ3FneWFyZWd1eHZ1ZWhsaHN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDAzODQsImV4cCI6MjAyOTQxNjM4NH0.UStuXqACI8ZfZ3ep02wGZIFA3yGIWNC_d0EJnpeV6CQ");

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

export default App;