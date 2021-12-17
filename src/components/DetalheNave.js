import React, {useState, useEffect } from 'react';

var distanceTripMGLT = 1000000;

export function DetalheNave(props) {

    const [dataNave, setDataNave] = useState([]);

    useEffect( () => {
        loadDataNaves();
    }, []);  

    async function loadDataNaves() {
        let response = await fetch('https://www.swapi.tech/api/starships/'.concat(props.nave.uid));
        response.json().then(result => {
            setDataNave(result);
            realizaCalculo(result);
        });


    }      
    return(        
        <></>

    );
  
}

function realizaCalculo(starShip){
    
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
