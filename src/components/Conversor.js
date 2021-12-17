import React, {useState, useEffect } from 'react';
import { DetalheNave } from './DetalheNave';

function Conversor() { 
    const [dataNaves, setDataNaves] = useState([]);

    useEffect( () => {
        loadDataNaves();
    }, []);  

    async function loadDataNaves() {
        let response = await fetch('https://www.swapi.tech/api/starships/');
        await response.json().then(results => setDataNaves(results));
    }
    
  return (
      <div className="App">
          {dataNaves.results !== undefined && dataNaves.results.map(nave => (
              <div key={nave.uid}>
                <p>{nave.name}</p>
                <DetalheNave nave={nave}/>                
              </div>
          ))}
      </div>
  );
}

export default Conversor;
