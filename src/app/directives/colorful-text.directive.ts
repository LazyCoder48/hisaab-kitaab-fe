import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {CommonService}                               from '../services/common.service';

const COLORS: string[] = [
    '#e74c3c',  // red
    '#8e44ad',  // purple
    '#2ecc71',  // emerald
    '#3498db',  // blue
    '#27ae60',  // green
    '#f1c40f',  // yellow
    '#16a085',  // sea green
    '#e67e22',  // orange
    '#d35400',  // pumpkin
    '#1abc9c',  // teal
    '#2980b9',  // dark blue
    '#9b59b6',  // amethyst
    '#c0392b',  // dark red
    '#34495e',  // wet asphalt
    '#7f8c8d',  // grey
    '#c0392b',  // pomegranate
    '#bdc3c7',   // silver
    '#f39c12',  // sunflower
    '#c0392b',  // pomegranate
    '#bdc3c7',   // silver
    '#8e44ad',  // purple
    '#3498db',  // blue
    '#27ae60',  // green
    '#f1c40f',  // yellow
    '#e67e22',  // orange
    '#2ecc71',  // emerald
    '#1abc9c',  // teal
    '#2980b9',  // dark blue
    '#d35400',  // pumpkin
    '#c0392b',  // dark red
    '#16a085',  // sea green
    '#9b59b6',  // amethyst
    '#34495e',  // wet asphalt
    '#7f8c8d',   // grey
    '#95a5a6',  // light grey
    '#f39c12',  // sunflower
    '#d35400',  // carrot
    '#c0392b',  // pomegranate
    '#bdc3c7',   // silver
    '#f39c12',  // sunflower
    '#c0392b',  // pomegranate
    '#bdc3c7',   // silver
    '#8e44ad',  // purple
    '#3498db',  // blue
    '#27ae60',  // green
    '#f1c40f',  // yellow
    '#e67e22',  // orange
    '#e74c3c',  // red
    '#8e44ad',  // purple
    '#2ecc71',  // emerald
    '#3498db',  // blue
    '#27ae60',  // green
    '#f1c40f',  // yellow
    '#16a085',  // sea green
    '#e67e22',  // orange
    '#d35400',  // pumpkin
    '#1abc9c',  // teal
    '#2980b9',  // dark blue
    '#9b59b6',  // amethyst
    '#c0392b',  // dark red
    '#34495e',  // wet asphalt
    '#7f8c8d',  // grey
    '#c0392b',  // pomegranate
    '#bdc3c7',   // silver
    '#f39c12',  // sunflower
    '#c0392b',  // pomegranate
    '#bdc3c7',   // silver
    '#8e44ad',  // purple
    '#3498db',  // blue
    '#27ae60',  // green
    '#f1c40f',  // yellow
    '#e67e22'  // orange
];

@Directive({
               selector: '[appColorfulText]'
           })

export class ColorfulTextDirective implements AfterViewInit {

    @Input('appColorfulText') text: string = '';

    constructor(private el: ElementRef, private commonService: CommonService) { }

    ngAfterViewInit() {
        const rearrangedColors = this.commonService.rearrangeElements(COLORS, 0, COLORS.length);
        console.log(this.text);
        if (this.text.length > 0) {
            const textArray = this.text.split("");
            console.log(textArray);
            let spans = "";
            textArray.forEach((letter, index) => {
                console.log(letter, index + 1);
                const randomColor = this.getRandomColor();
                const color       = COLORS ? rearrangedColors[index % rearrangedColors.length] : randomColor;
                spans += `<span style="color: ${color};">${letter}</span>`;
            });
            console.log(spans);
            this.el.nativeElement.innerHTML = spans;
        }
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color     = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[letters.length * Math.random() | 0];
        }
        console.log(color);
        return color;
    }

}