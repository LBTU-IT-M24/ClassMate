import { defineStore } from 'pinia';
import { guid } from '@/helpers/Random/guid';

export interface CardPosition {
    left: number;
    top: number;
}

export interface BrainstormCard {
    id: string;
    title: string;
    content: string;
    isDragging: boolean;
    isHovering: boolean,
    isSelected: boolean,
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    headerHeight: number;
    rotation: number;
    position: CardPosition;
    connections: BrainstormCard[];
}

export const useBrainstormBoard = defineStore('brainstormBoard', {
    state: () => {
        const card1: BrainstormCard = {
            id: guid(),
            title: 'Victim',
            content: 'Found dead in the park.',
            connections: [],
            isDragging: false,
            isHovering: false,
            isSelected: false,
            width: 200,
            height: 250,
            offsetX: 0,
            offsetY: 0,
            headerHeight: 72,
            rotation: 0,
            position: {
                left: 200,
                top: 450,
            },
        };
        const card2: BrainstormCard = {
            id: guid(),
            title: 'Suspect A',
            content: 'Was seen near the park around the time of death.',
            connections: [],
            isDragging: false,
            isHovering: false,
            isSelected: false,
            width: 200,
            height: 250,
            offsetX: 0,
            offsetY: 0,
            headerHeight: 72,
            rotation: 0,
            position: {
                left: 1100,
                top: 100,
            },
        };
        const card3: BrainstormCard = {
            id: guid(),
            title: 'Suspect B',
            content: 'Has a history of disputes with the victim.',
            connections: [],
            isDragging: false,
            isHovering: false,
            isSelected: false,
            width: 200,
            height: 250,
            offsetX: 0,
            offsetY: 0,
            headerHeight: 72,
            rotation: 0,
            position: {
                left: 1200,
                top: 450,
            },
        };
        const card4: BrainstormCard = {
            id: guid(),
            title: 'Weapon',
            content: 'The murder weapon was a knife.',
            connections: [],
            isDragging: false,
            isHovering: false,
            isSelected: false,
            width: 200,
            height: 250,
            offsetX: 0,
            offsetY: 0,
            headerHeight: 72,
            rotation: 0,
            position: {
                left: 600,
                top: 400,
            },
        };
        const card5: BrainstormCard = {
            id: guid(),
            title: 'Location',
            content: 'The park is known for its secluded areas.',
            connections: [],
            isDragging: false,
            isHovering: false,
            isSelected: false,
            width: 200,
            height: 250,
            offsetX: 0,
            offsetY: 0,
            headerHeight: 72,
            rotation: 0,
            position: {
                left: 500,
                top: 50,
            },
        };
        const card6: BrainstormCard = {
            id: guid(),
            title: 'Witness',
            content: 'Saw a shadowy figure leaving the park.',
            connections: [],
            isDragging: false,
            isHovering: false,
            isSelected: false,
            width: 200,
            height: 250,
            offsetX: 0,
            offsetY: 0,
            headerHeight: 72,
            rotation: 0,
            position: {
                left: 800,
                top: 150,
            },
        };

        card1.connections.push(...[card4, card5, card6]);
        card2.connections.push(card6);
        card3.connections.push(card4);

        return {
            cards: [card1, card2, card3, card4, card5, card6] as BrainstormCard[],
            selectedCard: null as BrainstormCard|null,
            scale: 1,
            mouseX: 0,
            mouseY: 0,
            isConnectingMode: false,
        };
    },
    getters: {},
    actions: {
        add(card: BrainstormCard) {
            this.cards.push(card);
        },
        clearAll() {
            this.cards = [];
        },
        remove(cardToRemove: BrainstormCard) {
            this.cards.forEach((card: BrainstormCard) => {
                card.connections.forEach((connection) => {
                    if (connection.id === cardToRemove.id) {
                        card.connections = card.connections.filter((conn) => conn.id !== cardToRemove.id);
                    }
                }) ;
            });
            this.cards = this.cards.filter((card: BrainstormCard) => card.id !== cardToRemove.id);
        },
        setScale(scale: number) {
            this.scale = scale;
        },
        setSelected(card: BrainstormCard|null) {
            this.selectedCard = card;
        },
        clearSelected(card: BrainstormCard) {
            this.selectedCard = null;
            card.isSelected = false;
        },
        clearHover() {
            this.cards.forEach((card: BrainstormCard) => card.isHovering = false);
        },
        setMousePosition(x: number, y: number) {
              this.mouseX = x;
              this.mouseY = y;
        },
        setIsConnectingMode(isConnecting: boolean) {
            this.isConnectingMode = isConnecting;
        },
    },
});
