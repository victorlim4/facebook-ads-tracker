import { useState, useContext } from 'react'
import { FiFacebook, FiInstagram, FiSearch } from 'react-icons/fi'

import './styles.scss'
import { AuthContext } from '../../contexts/auth'

import { Logo } from '../../assets/Logo'

export function Home() {

    const [search, setSearch] = useState('');
    const { token } = useContext(AuthContext);

    const [data, setData] = useState([]);

    const getSearch = () => {
        /**
         * Fazendo Chamada para a API do Facebook
         * Filtrando e setando os parametros necessários
         * Salvando dados em um estado
         */

        window.FB.api(
            '/ads_archive',
            'GET',
            {
                "search_terms": search,
                "ad_reached_countries":"['BR']",
                "limit":"25",
                "search_type": "KEYWORD_EXACT_PHRASE",
                "access_token": token,
                "fields": "impressions, page_name, page_id, publisher_platforms, ad_creative_bodies, estimated_audience_size, spend, ad_snapshot_url, ad_creation_time, ad_delivery_start_time, ad_delivery_stop_time"
            },
            function(response) {
                // Setando dados
                if (response && !response.error) {
                    //console.log(response.data)
                    setData(response.data)
                } 
                else {
                    console.log("Failed to get data function")
                }
                
            }
        )
    }

    const Card = ({AdUrl, AdName, AdImpressions, Spend, AdCreatedDate, Platforms, Audience, Beginning, End}) => {
        return (
        <div className="card">
            <span className="title">{AdName}</span>

            {AdImpressions.map((impression) => {
                return (
                 <span>Impressões: <strong>{impression?.lower_bound}-{impression?.upper_bound}K</strong></span>
                )
            })}

            {Audience.map((audience) => {
                return (
                 <span>Audiencia: <strong>{audience?.lower_bound}-{audience?.upper_bound}K</strong></span>
                )
            })}

            {Spend.map((spend) => {
                return (
                 <span>Gastos: <strong>R${spend?.lower_bound}-{spend?.upper_bound}</strong></span>
                )
            })}

            {Platforms.map((platform) => {

                function verify(plat) {
                    if (plat === "facebook") {
                        return <FiFacebook />
                    } else {
                        return <FiInstagram />
                    }
                }
                return (
                    <span>Plataformas: 
                    <strong>
                    {
                        platform[0] != null 
                        ? verify(platform[0]) : null
                        } 
                    {
                        platform[1] != null 
                        ? verify(platform[1]) : null
                        }
                        </strong>
                    </span>
                )
            })}

            <span>Criado em: <strong>{AdCreatedDate}</strong></span>
            <span>Inicio: <strong>{Beginning}</strong></span>
            <span>Fim: <strong>{End != null ? End : "Em Andamento"}</strong></span>

            <div className="adUrl">
                <a href={AdUrl}>Ver Anúncio</a>
            </div>

        </div>
        )
    }

    return (
        <div className="homeContainer">
            {/** Logo */}
            <Logo />

            {/** Search */}
            <div className="searchContainer">
                {/** icon */}
                <FiSearch size="22"/>

                {/** input */}
                <input 
                    name="search"
                    type="text"
                    placeholder="Cole aqui o seu link ou pesquise algo"
                    onChange={({target}) => setSearch(target.value)}
                    value={search}
                />

                {/** button */}
                <button className="button" onClick={getSearch}>
                    Pesquisar
                </button>

            </div>

            <div className="cardsSection">
                {/** Mapeando dados para os cartões */} 
                <div className="grid">
                    {
                       data.length > 0 ?
                       data.map(dado =>
                            <Card 
                                key={dado.id}
                                AdUrl={dado.ad_snapshot_url}
                                AdName={dado.page_name}
                                AdImpressions={[dado.impressions]}
                                Spend={[dado.spend]}
                                AdCreatedDate={dado.ad_creation_time}
                                Beginning={dado.ad_delivery_start_time}
                                End={dado.ad_delivery_stop_time}
                                Audience={[dado.estimated_audience_size]}
                                Platforms={[dado.publisher_platforms]}
                            />
                        )
                        :
                        console.log("Não encontramos nada")
                    }
                </div>
            </div>
        </div>
    )
}