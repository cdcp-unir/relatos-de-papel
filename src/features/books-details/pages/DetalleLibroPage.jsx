import React from 'react';
import Label from '../../../shared/components/Label';

function DetalleLibroPage() {
    return (
        <>
            <Label texto="THE ADVENTURES OF SUPER DIAPER BABY: COLOR EDITION" />
            <div style={{
                height: "500px",
                width: "100wv",
                display: "flex"
            }}>
                <img style={{
                    height: "500px",
                    width: "500px"
                }} src='https://anterior.mrbooks.com/mrbooks/portadas/9781338687859.webp'></img>
                <p>In this all-new color version with updated spelling and grammar, Dav Pilkey brilliantly weaves a good-hearted, action-packed story that will inspire heroes of all ages.Super Diaper Baby is an actual baby called Billy who gains special superpowers along with his trusty companion, Diaper Dog. Our dynamic superhero's archenemy, Deputy Dangerous, wants to steal his powers and take over the planet. Will the diaper-wearing dynamo duo defeat the deputy, or is the entire Earth doomed?</p>
            </div>
        </>
    );
}

export default DetalleLibroPage;