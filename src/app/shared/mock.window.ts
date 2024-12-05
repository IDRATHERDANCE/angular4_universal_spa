import { InjectionToken } from "@angular/core";
import { InterfaceMockWindow } from "./mock.window.inteface";


export const MOCK_WINDOW = new InjectionToken<InterfaceMockWindow>('MockWindow')

export const MockWindow: InterfaceMockWindow = {
    window: {
        innerWidth: 1200,
        innerHeight: 675
    },
    image: {
        naturalWidth: 600,
        naturalHeight: 400
    },
    textBox: {
        clientHeight: 700
    },
    elClHeight: 200,
    defaultUrl: 'http://idrather.dance/ana_backend/wordpress/wp-content/uploads/Ana-Rajcevic-ANIMAL-The-Other-Side-of-Evolution.jpg',
    defaultKeywords: 'ana rajcevic, art, sculpture, wearable sculptures, beauty, design'
};

