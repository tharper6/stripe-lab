import { IUser } from "./interfaces";
import { strict } from "assert";
import { string } from "prop-types";
import { METHODS } from "http";

export let AccessToken: string = localStorage.getItem('token') || null;

export let User: IUser = {
    userid: localStorage.getItem('userid') || null,
    role: localStorage.getItem('role') || null
};

export const SetAccessToken = (token: string, user: IUser = { userid: undefined, role: 'guest' }) => {
    AccessToken = token;
    User = user; 
    
    localStorage.setItem('token', token);
    localStorage.setItem('userid', User.userid);
    localStorage.setItem('role', User.role);
};

export const json = async <T = any>(uri: string, method: string = 'GET', body?: {}) => {

    let headers: any = {
        'Content-type': 'application/json'
    }

    if(AccessToken) {
        headers["Authorization"] = `Bearer ${AccessToken}`;
    }

    try {
        
        let result = await fetch(uri, {
            method,
            headers,
            body: JSON.stringify(body)
        });

        if(result.ok) {
            return <T>(await result.json());
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        throw error
    }
}