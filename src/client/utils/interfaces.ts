export interface IBlog {
        id: number,
        title: string,
        content: string,
        authorid: number,
        _created: Date
}

export interface ITag {
        id: number,
        name: string,
        _created: Date
}

export interface IUser {
        userid: string,
        role: string
}