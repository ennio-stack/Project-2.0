import React, { useContext, useState } from 'react';
import VoitureContext from './VoitureContext';

const Voiture = () => {
    const [mark, setmark] = useState('TOYOTA');
    return (
        <div>
            <h1>voiture</h1>
            <Voiture1 mark={mark} />
        </div>
    );
};
function Voiture1({mark}) {
    return <div>
        
        <h1>Voiture 1</h1>
        <p>{mark}</p>
        <Voiture2 mark={mark} />
    </div>
}
function Voiture2({mark}) {
    return <div>
        <h1>Voiture 2</h1>
        <p>{mark}</p>
        <Voiture3 mark={mark} />
    </div>

}
function Voiture3({mark}) {
    return <div>
        <h1>Voiture 3</h1>
        <p>{mark}</p>
        <Voiture4 mark={mark} />
    </div>
}
function Voiture4() {
    const mark = useContext(VoitureContext);
    return <div>
        <h1>Voiture 4</h1>
       
        <p>valeur de la mark:{mark}</p>
    </div>
}

export default Voiture;