import {HouseHoldMember} from './house-hold-member';

export interface HouseHold {
    id: string;
    name: string;
    address: string;
    members: HouseHoldMember[];
}