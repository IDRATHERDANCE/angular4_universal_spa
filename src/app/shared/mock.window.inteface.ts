export interface InterfaceMockWindow {
    window: windowInt,
    image: imageObj,
    textBox: textBoxObj,
    elClHeight: number,
    defaultUrl: string,
    defaultKeywords: string
    
};


interface imageObj {
    naturalWidth: number,
    naturalHeight: number
};

interface textBoxObj {
    clientHeight: number
}

interface windowInt {
    innerWidth: number,
    innerHeight: number
}
