'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminForm() {
    const [newCharacter, setNewCharacter] = useState({ name: '', thumbnail: ''})

    async function handleSubmit(e) {
        e.preventDefault()
        const { data, error } = await supabase
            .from('characters')
            .insert([newCharacter])
            .select()

        if (error) console.error('Error adding character:', error)
        else {
            console.log('Character added:', data)
            setNewCharacter({ name: '', thumbnail: ''})
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <br/>
            <p>
            <input 
                value={newCharacter.name}
                onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                placeholder="Character Name"
            />
            </p>
            <br/>
            <p>
            <input 
                value={newCharacter.thumbnail}
                onChange={(e) => setNewCharacter({ ...newCharacter, thumbnail: e.target.value })}
                placeholder="Thumbnail URL"
            />
            </p>
            <br/>
            <button type="submit">Add Character</button>
        </form>
    )
}