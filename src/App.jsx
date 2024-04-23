import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://xggqgyareguxvuehlhst.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnZ3FneWFyZWd1eHZ1ZWhsaHN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDAzODQsImV4cCI6MjAyOTQxNjM4NH0.UStuXqACI8ZfZ3ep02wGZIFA3yGIWNC_d0EJnpeV6CQ");

function App() {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [text, setText] = useState('插入数据');
  const [id, setId] = useState(0);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select().order( "id",  { ascending: true });
    setCountries(data);
  }

    
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

    
  const handleClick =async () => {
    if(text === '插入数据'){
      const { data, error } = await supabase
      .from('countries')
      .insert([
        { name:inputValue },
      ])
      getCountries()
    }else{
      console.log('确认修噶');
      console.log(id);
      const { data, error } = await supabase
        .from('countries')
        .update({ name: inputValue })
        .eq('id', id)
        .select()
        console.log(data);
        setText('插入数据')

    }
    setInputValue('')
    getCountries()

  };
  const handleDeleteClick =async (id) => {
    console.log(id);
    const { error } = await supabase
    .from('countries')
    .delete()
    .eq('id', id)
    getCountries()

  };
  const handleChangeClick =async (country) => {
    console.log(country);
    setInputValue(country.name)
    setText('确认修改')
    setId(country.id)
    

    // const { error } = await supabase
    // .from('countries')
    // .delete()
    // .eq('id', id)
    // getCountries()

  };


  


  return (
    <>
     <div>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange} 
        placeholder="请输入内容" 
      />
      <button onClick={handleClick}>{text}</button>
    </div>

       <ul>
      {countries.map((country) => (
        
        <li key={country.name}>{country.name} 
        <button  onClick={() => handleChangeClick(country)}>修改数据</button>
        
        
        <button  onClick={() => handleDeleteClick(country.id)}>删除数据</button></li>   
      ))}
    </ul>

    </>
 
  );
}

export default App;