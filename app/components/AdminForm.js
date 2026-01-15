'use client'

import { useEffect, useState } from "react";
import { supabase } from '../../lib/supabaseClient'

export default function AdminForm() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
        setUser(data.user);
        });
    }, []);


    const [newCharacter, setNewCharacter] = useState({ name: '', thumbnail: ''})

    async function handleSubmit(e) {
        if (!user) {
            alert("로그인 후 글을 작성할 수 있습니다.");
            return;
        }

        e.preventDefault()
        const { data, error } = await supabase
            .from('characters')
            .insert([newCharacter])
            .select()

        if (error) console.error('Error adding character:', error)
        else {
            console.log('Character added:', data)
            alert(`제출됨: ${newCharacter.name}`)
            setNewCharacter({ name: '', thumbnail: ''})
        }
    }

    return (
        <form  onSubmit={handleSubmit}>
            <div>
                <p>이름 : </p>
                <input id="name" name="name"
                    value={newCharacter.name}
                    onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                    placeholder="Character Name"
                />
            </div>

            <div>
                <p>사진 : </p>
                <input id="thumbnail" name="thumbnail"
                    value={newCharacter.thumbnail}
                    onChange={(e) => setNewCharacter({ ...newCharacter, thumbnail: e.target.value })}
                    placeholder="사진경로"
                />
            </div>
            <br/>
            <button type="submit">사용자등록</button>
        </form>
    )
}