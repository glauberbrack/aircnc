import React, { useState, useMemo } from 'react';
import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './style.css';

export default function New({ history }){
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail])

  async function handleSubmit(e){
    e.preventDefault();
    const data = new FormData();
    const userId = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('./spots', data, {
      headers: {userId}
    })

    history.push('/dashboard');
  }


  return (
    <form onSubmit={handleSubmit}>

      <label
      id="thumbnail"
      style={{backgroundImage: `url(${preview})`}}
      className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={ e => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>


      <label htmlFor="company">EMPRESA*</label>
      <input 
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />

      <label htmlFor="techs">TECNOLOGIAS* <span>(separadas por vírgula)</span></label>
      <input 
        id="techs"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={e => setTechs(e.target.value)}
      />

      <label htmlFor="price">VALOR DA DIÁRIA* <span>(deixe em branco para grautito)</span></label>
      <input 
        id="price"
        placeholder="Valor em reais"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />  
      
      <button className="btn">CADASTRAR</button>

    </form>
  )
}