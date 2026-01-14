'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function CharacterList() {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        fetchCharacters()
    }, [])

    async function fetchCharacters() {
        const { data, error } = await supabase
            .from('characters')
            .select("*")
            //.select(`*, actions (*)`)

        if (error) console.error('Error fetching characters:', error)
        else setCharacters(data)
    }

    return (
        <div>
            {characters.map(character => (
                <div key={character.id}>
                    <h2>{character.name}</h2>
                    <img src={character.thumbnail} alt={character.name} style={{width:'100px'}} />
                    <h3>Action:</h3>
                    <ul>
                        {}
                    </ul>
                </div>
            ))}    
        </div>
    )
}