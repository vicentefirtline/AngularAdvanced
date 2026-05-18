import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Minhapagina } from './minhapagina';

describe('Minhapagina', () => {
  let component: Minhapagina;
  let fixture: ComponentFixture<Minhapagina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Minhapagina],
    }).compileComponents();

    fixture = TestBed.createComponent(Minhapagina);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
