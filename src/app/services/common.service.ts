import {Injectable} from '@angular/core';

@Injectable({
                providedIn: 'root'
            })
export class CommonService {

    rearrangeElements<T>(list: T[], fromIndex: number, toIndex: number): T[] {
        if (fromIndex < 0 || fromIndex >= list.length || toIndex < 0 || toIndex >= list.length) {
            return list; // Or throw an error, depending on your needs
        }

        const newList          = [...list]; // Create a copy to avoid modifying the original
        const [removedElement] = newList.splice(fromIndex, 1);
        newList.splice(toIndex, 0, removedElement);

        return newList;
    }

}