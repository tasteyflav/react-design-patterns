import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const withEditableUser = (Component, userId) => {
    return props => {
        const [originalUser, setOriginalUser] = useState(null);
        const [user, setUser] = useState(null);

        useEffect(() => {
            (async () => {
                const reponse = await axios.get(`/users/${userId}`);
                setOriginalUser(reponse.data);
                setUser(reponse.data);
            })();
        },[]);

        const onChangeUser = changes => {
            setUser({...user, ...changes});
        }

        const onSaveUser = async () => {
            const response = await axios.post(`/users/${userId}`, { user });
            setOriginalUser(response.data);
            setUser(response.data);
        }

        const onResetUser = () => {
            setUser(originalUser);
        }

        return <Component {...props} 
            user={user} 
            onChangeUser={onChangeUser}
            onSaveUser={onSaveUser}
            onResetUser={onResetUser}/>
    }
} 
