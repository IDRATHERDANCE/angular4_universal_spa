export interface InterfaceMockWindow {
    window: windowInt,
    image: imageObj,
    textBox: textBoxObj,
    elClHeight: number,
    defaultUrl: string,
    defaultKeywords: string

}

export interface IWindowColumns {
    window: windowInt,
    elClHeight: number
}


export interface imageObj {
    naturalWidth: number,
    naturalHeight: number
}

export interface textBoxObj {
    clientHeight: number
}

export interface windowInt {
    innerWidth: number,
    innerHeight: number
}
