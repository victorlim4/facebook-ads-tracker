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
                 <span>Impressions: <strong>{impression?.lower_bound}-{impression?.upper_bound}K</strong></span>
                )
            })}

            {Audience.map((audience) => {
                return (
                 <span>Audience: <strong>{audience?.lower_bound}-{audience?.upper_bound}K</strong></span>
                )
            })}

            {Spend.map((spend) => {
                return (
                 <span>Spends: <strong>R${spend?.lower_bound}-{spend?.upper_bound}</strong></span>
                )
            })}

            {Platforms.map((platform) => {

                function verify(plat) {
                    plat === "facebook" ? <FiFacebook /> : <FiInstagram />
                }
                return (
                    <span>Platforms: 
                    <strong>
                    {
                        platform[0] != null ? verify(platform[0]) : null
                    } 
                    {
                        platform[1] != null ? verify(platform[1]) : null
                    }
                        </strong>
                    </span>
                )
            })}

            <span>Created At: <strong>{AdCreatedDate}</strong></span>
            <span>Beginning: <strong>{Beginning}</strong></span>
            <span>End: <strong>{End != null ? End : "In Progress"}</strong></span>

            <div className="adUrl">
                <a href={AdUrl}>See Ad</a>
            </div>

        </div>
        )
    }

    return (
        <div className="homeContainer">
            <Logo />

            <div className="searchContainer">
                <FiSearch size="22"/>

                <input 
                    name="search"
                    type="text"
                    placeholder="Search Something"
                    onChange={({target}) => setSearch(target.value)}
                    value={search}
                />

                <button className="button" onClick={getSearch}>
                    Search
                </button>

            </div>

            <div className="cardsSection">
                <div className="grid">
                    {
                       data.length > 0 ?
                       data.map(item =>
                            <Card 
                                key={item.id}
                                AdUrl={item.ad_snapshot_url}
                                AdName={item.page_name}
                                AdImpressions={[item.impressions]}
                                Spend={[item.spend]}
                                AdCreatedDate={item.ad_creation_time}
                                Beginning={item.ad_delivery_start_time}
                                End={item.ad_delivery_stop_time}
                                Audience={[item.estimated_audience_size]}
                                Platforms={[item.publisher_platforms]}
                            />
                        )
                        :
                        console.log("We didn't find anything")
                    }
                </div>
            </div>
        </div>
    )
}