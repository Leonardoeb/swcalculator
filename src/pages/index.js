import React, { useEffect, useState } from 'react';

/**DETALHES DA DOCUMENTAÇÃO*/
/*
MGLT string-- The Maximum number of Megalights this starship can travel in a standard hour. 
A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. 
This figure is only really useful for measuring the difference in speed of starships. 
We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.
*/

/*
MGLT string-- O número máximo de Megalights que esta nave pode viajar em uma hora padrão.
Um "Megalight" é uma unidade padrão de distância e nunca foi definida antes no universo de Star Wars.
Esta figura só é realmente útil para medir a diferença na velocidade de naves estelares.
Podemos assumir que é semelhante a UA, a distância entre o nosso Sol (Sol) e a Terra.
*/ 

/*
consumables *string
The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.
*/

var distanceTripMGLT = 1000000;

function CalculateStops(){

    const [allStarShips, setAllStarships] = useState([]);
    const [listStarShip, setListStarship] = useState([]);

    useEffect(() =>{

        async function fetchAllStarships(){
            
            let listStarships = await fetch('https://www.swapi.tech/api/starships/');
            let data = await listStarships.json();
            setAllStarships(data.results);

        }

        async function fetchDataStarship(){             
            /*
            for (const starship of allStarShips) {
                let dataStarship = await fetch('https://www.swapi.tech/api/starships/'.concat(starship.uid));  
                let data = await dataStarship.json();                

                let consumables = data.result.properties.consumables;
                let qtdDaysNonStop = calcDaysNonStop(consumables);

                let distancePerDay = data.result.properties.MGLT * 24;
                let daysTotalTrip  = Math.trunc(Number(distanceTripMGLT / distancePerDay));
                let qtdStops       = daysTotalTrip > qtdDaysNonStop ? Math.trunc(Number(daysTotalTrip/qtdDaysNonStop)) : 0;                

                console.log(`-------Uid: ${data.result.uid} Starship: ${data.result.properties.name} mglt: ${data.result.properties.MGLT}-------`);
                console.log(`Data Trip: distância total ---> ${distanceTripMGLT} MGLT`);
                console.log(`Data Trip: distância POR DIA ---> ${distancePerDay} MGLT`);
                console.log(`Data Trip: Precisa parar a cada ---> ${consumables} para adquirir consumable`);
                console.log(`Data Trip: RESULTADO ---> Total de ${daysTotalTrip} dias com ${qtdStops} PARADAS`);
            }  
            */
           
            let dataStarShip = [];
            for (const starship of allStarShips) {
                let dataStarship = await fetch('https://www.swapi.tech/api/starships/'.concat(starship.uid));  
                let data = await dataStarship.json();                
                dataStarShip.push(data);
            }
            setListStarship(dataStarShip);
        }

        if(allStarShips.length === 0) {
            fetchAllStarships();
        }
        if(listStarShip.length === 0) {
            fetchDataStarship();
        }

    },[]); 
    //console.log('Aeros ', allStarShips);
    //console.log('Data ', listStarShip);

    for (const starShip of listStarShip) {

            let consumables = starShip.result.properties.consumables;
            let qtdDaysNonStop = calcDaysNonStop(consumables);

            let distancePerDay = starShip.result.properties.MGLT * 24;
            let daysTotalTrip  = Math.trunc(Number(distanceTripMGLT / distancePerDay));
            let qtdStops       = daysTotalTrip > qtdDaysNonStop ? Math.trunc(Number(daysTotalTrip/qtdDaysNonStop)) : 0;                

            console.log(`-------Uid: ${starShip.result.uid} Starship: ${starShip.result.properties.name} mglt: ${starShip.result.properties.MGLT}-------`);
            console.log(`Data Trip: distância total ---> ${distanceTripMGLT} MGLT`);
            console.log(`Data Trip: distância POR DIA ---> ${distancePerDay} MGLT`);
            console.log(`Data Trip: Precisa parar a cada ---> ${consumables} para adquirir consumable`);
            console.log(`Data Trip: RESULTADO ---> Total de ${daysTotalTrip} dias com ${qtdStops} PARADAS`);

    }
    

    return (
        <>
            
                Olá
            
        </>
    );
}

function calcDaysNonStop(consumables){
    //1 - year
    //2 - month
    //3 - week
    //4 - day
    let period  = consumables.includes('year') ? 1 : 
                    consumables.includes('month') ? 2 : 
                        consumables.includes('week') ? 3 : 4;

    //Qtd tempo de consumiveis para toda tripulação                
    let qtdPeriod = Number(consumables.substring(0, 1));

    switch (period) {
        case 1:
            
            return qtdPeriod * 360;             
        case 2:
            
            return qtdPeriod * 30;            
        case 3:
            
            return qtdPeriod * 7;            
        default:

            return qtdPeriod;
    }
}


export default CalculateStops;