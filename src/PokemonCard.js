import React, { useEffect } from "react";
import Detail from "./Detail";
import pokeball from "./pokeball.png";

const PokemonCard = (props) => {
  let typing = "";
  let sprite;
  let name;
  let height;
  let weight;
    let dexEntry;
  

  if (props.pokemon.name !== undefined) {
    name = props.pokemon.name;
    height = props.pokemon.height / 10 + "m";
    weight = props.pokemon.weight / 10 + "kg";
    dexEntry = props.dex.replace('', ' ');
    if (props.pokemon.types.length <= 1) {
      typing = (
        <div>
          {props.pokemon.types[0].type.name.replace(/^\w/, (c) =>
            c.toUpperCase()
          )}
        </div>
      );
    } else {
      typing = (
        <div>
          {props.pokemon.types[0].type.name.replace(/^\w/, (c) =>
            c.toUpperCase()
          ) +
            "/" +
            props.pokemon.types[1].type.name.replace(/^\w/, (c) =>
              c.toUpperCase()
            )}
        </div>
      );
    }
    sprite = props.pokemon.sprites.other.dream_world.front_default;
  } else {
    sprite = pokeball;
    name = "Error, Please Select Another Pokémon";
    typing = "???";
    height = "???";
    weight = "???";
  }


  const card = ( <div>
        <img style={{ width: "auto", maxHeight: "225px" }} src={sprite} />
        <h4 style={{textTransform: 'capitalize', fontWeight: 'bold'}}>{name}</h4>

        {typing}
        <Detail label="Height" value={height} />
        <Detail label="Weight" value={weight} />
        <p style={{marginTop: ".75rem"}}><em>{dexEntry}</em></p>
    </div>);

    const loader = (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>);

  if (props.isLoading) {
    return loader;
  }
  else {
    return card;
  }
};

export default PokemonCard;
