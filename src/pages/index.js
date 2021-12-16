import React, { useEffect, useState } from 'react';

var distanceMGLT = 1000000;

function CalculateStops(){

    const [allStarShips, setAllStarships] = useState([]);

    useEffect(() =>{

        async function fetchAllStarships(){
            
            let listStarships = await fetch('https://www.swapi.tech/api/starships/');
            let data = await listStarships.json();
            setAllStarships(data.results);

        }

        async function calculateStops(){             

            for (const starship of allStarShips) {
                console.log('https://www.swapi.tech/api/starships/'.concat(starship.uid));
                let dataStarship = await fetch('https://www.swapi.tech/api/starships/'.concat(starship.uid));  
                let data = await dataStarship.json();
                console.log(`UID: ${data.result.uid}  - Nave:${data.result.properties.name} - MGLT:${data.result.properties.MGLT}`);
                            }           
        }

        fetchAllStarships();   
        calculateStops();

    },[]);    
    return(
        <>
            <p>olá</p>
        </>
        
    );
}


export default CalculateStops;