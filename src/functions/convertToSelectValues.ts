


//world, vocation, skills,


const convertToSelectValues = (world?: string, vocation?: string, skill?: string) => {

    let vocationCode = '1';
    let skillCode = '';


    switch (vocation) {
        case 'Nenhuma' || null || undefined || '':
            vocationCode = '1';
            break;
        case 'Druid':
            vocationCode = '2';
            break;
        case 'Knight':
            vocationCode = '3';
            break;
        case 'Paladin':
            vocationCode = '4';
            break;
        case 'Sorcerer':
            vocationCode = '5';
            break;
    }

    switch (skill) {
        case 'Nenhuma' || null || undefined || '':
            skillCode = '';
            break;
        case 'Axe Fighting':
            skillCode = '10';
            break;
        case 'Club Fighting':
            skillCode = '9';
            break;
        case 'Distance Fighting':
            skillCode = '7';
            break;
        case 'Fishing':
            skillCode = '13';
            break;
        case 'Fist Fighting':
            skillCode = '11';
            break;
        case 'Magic Level':
            skillCode = '1';
            break;
        case 'Shielding':
            skillCode = '6';
            break;
        case 'Sword Fighting':
            skillCode = '8';
            break;
    }


    return { vocationCode, skillCode };

}

export default convertToSelectValues;