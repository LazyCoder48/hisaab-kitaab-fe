import {TestBed}      from '@angular/core/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
                                                 imports: [AppComponent]
                                             }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app     = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have the 'hisaab-kitaab-fe' title`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app     = fixture.componentInstance;
        expect(app.title).toEqual('hisaab-kitaab-fe');
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Hello, hisaab-kitaab-fe');
    });
});